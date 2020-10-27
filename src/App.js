import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Home, Edit, Account } from "./pages";
import tcb from "./tcb";

const theme = {
  backgroundColor: {
    primary: "#1e272e",
    secondary: "#39444c",
  },

  color: {
    primary: "#fff",
    secondary: "#aab1b7",
    income: "#0be881",
    expense: "#ff5e57",
  },
};

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-size: 14px;
    font-family: -apple-system,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,Segoe UI,Roboto,sans-serif;
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

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {!loginState ? (
          <p>Loading...</p>
        ) : (
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/add" component={Edit} />
              <Route path="/account" component={Account} />
            </Switch>
          </Router>
        )}
      </ThemeProvider>
    </>
  );
};

export default App;
