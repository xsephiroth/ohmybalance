import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Home, Edit } from "./pages";

const theme = {
  backgroundColor: {
    primary: "black",
    secondary: "#eee",
  },

  color: {
    income: "#59df59",
    expense: "#ff7373",
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
    font-family: Arial, Helvetica, sans-serif;
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={Edit} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
