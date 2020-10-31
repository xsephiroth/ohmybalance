const TCB = require("@cloudbase/node-sdk");
const bcrypt = require("bcryptjs");

const collection = "ohmybalance-users";

const tcb = TCB.init({
  env: process.env.ENV_ID,
  credentials: {
    env_id: process.env.ENV_ID,
    private_key_id: process.env.CUSTOM_LOGIN_PRIVATE_KEY_ID,
    private_key: process.env.CUSTOM_LOGIN_PRIVATE_KEY,
  },
});

const auth = tcb.auth();
const db = tcb.database();

exports.main = async (event, context) => {
  switch (event.action) {
    case "register":
      return await register(event, context);
    case "login":
      return await login(event, context);
    default:
      return { error: "invalid action" };
  }
};

const hasUsername = async (username) => {
  const { total } = await tcb
    .database()
    .collection(collection)
    .where({ username })
    .count();
  return total !== 0;
};

const register = async (event) => {
  let { username, password } = event;
  if (!username && !password) {
    return { error: "invalid params" };
  }
  username = username.trim();
  if (username === "") {
    return { error: "invalid username" };
  }

  if (await hasUsername(username)) {
    return {
      error: "user exists",
    };
  }

  if (password.length < 6) {
    return { error: "password is too short" };
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    await db.collection(collection).add({
      username,
      password: hash,
    });
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: "something error happened" };
  }
};

const login = async (event) => {
  let { username, password } = event;
  if (!username && !password) {
    return { error: "invalid params" };
  }
  username = username.trim();
  if (username === "") {
    return { error: "invalid username" };
  }

  const queryRes = await db.collection(collection).where({ username }).get();
  if (!queryRes.data.password) {
    console.log("user not exists");
    return { error: "login failed" };
  }
  const {
    data: [{ password: hash }],
  } = queryRes;

  if (!(await bcrypt.compare(password, hash))) {
    return { error: "login failed" };
  }

  const ticket = await auth.createTicket(username);
  return { ticket };
};
