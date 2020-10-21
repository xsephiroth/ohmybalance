import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Home, Edit } from "./pages";

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
