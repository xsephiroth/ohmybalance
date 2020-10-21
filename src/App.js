import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import CreateBill from "./pages/CreateBill";
import Home from "./pages/Home";

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

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add" component={CreateBill} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
