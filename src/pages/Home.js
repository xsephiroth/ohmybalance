import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Bill, FloatButton } from "../components";
import tcb from "../tcb";

const useAuth = () => {
  const [loginState, setLoginState] = useState(null);

  useEffect(() => {
    if (!tcb.auth().hasLoginState()) {
      tcb
        .auth()
        .anonymousAuthProvider()
        .signIn()
        .then((res) => setLoginState(res))
        .catch(console.error);
    }
  }, []);

  return loginState;
};
const Home = () => {
  const history = useHistory();
  const loginState = useAuth();

  const bill1 = {
    amount: 10,
    type: "EXPENSE",
    category: "日用",
    remark: "备注了些东备注了些备注了些东备注了些东西西西西西",
  };

  const bill2 = {
    amount: 185,
    type: "INCOME",
    category: "日用",
    remark: "备注了些东备注了些东注了些东备注了些东西西西西西",
  };
  return (
    <>
      <Card>
        <Card.Body>
          <>
            <Bill bill={bill1} />
            <Bill bill={bill2} />
          </>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <>
            <Bill bill={bill1} />
            <Bill bill={bill2} />
          </>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          <>
            <Bill bill={bill1} />
            <Bill bill={bill2} />
          </>
        </Card.Body>
      </Card>
      <FloatButton onClick={() => history.push("/add")}>+</FloatButton>
    </>
  );
};

export default Home;
