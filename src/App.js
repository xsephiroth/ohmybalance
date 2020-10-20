import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Card, Bill, FloatButton } from "./components";
import tcb from "./tcb";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    min-height: 100vh;
  }

  body {
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

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

const App = () => {
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
      <GlobalStyle />
      <div className="App">
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
      </div>
      <FloatButton>+</FloatButton>
    </>
  );
};

export default App;
