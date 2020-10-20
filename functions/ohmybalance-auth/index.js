const TCB = require("@cloudbase/node-sdk");
const bcrypt = require("bcryptjs");
const credentials = require("./tcb_custom_login_key.json");

const collection = "ohmybalance-users";

const tcb = TCB.init({
  env: credentials.env_id,
  credentials,
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
  username = username.trim();
  if (username === "") {
    return { error: "invalid username" };
  }

  const {
    data: [{ password: hash }],
  } = await db.collection(collection).where({ username }).get();

  if (!(await bcrypt.compare(password, hash))) {
    return { error: "login failed" };
  }

  const ticket = await auth.createTicket(username);
  return { ticket };
};
