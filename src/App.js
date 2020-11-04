import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { auth } from "./tcb";
import LoadingFallback from "./components/LoadingFallback";

// pages
const Bills = React.lazy(() => import("./pages/Bills"));
const Bill = React.lazy(() => import("./pages/Bill"));
const Account = React.lazy(() => import("./pages/Account"));

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

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth.hasLoginState() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/account",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

const App = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <React.Suspense fallback={<LoadingFallback />}>
          <Router>
            <Switch>
              <PrivateRoute exact path="/">
                <Bills />
              </PrivateRoute>
              <PrivateRoute path="/bill">
                <Bill />
              </PrivateRoute>
              <Route path="/account" component={Account} />
            </Switch>
          </Router>
        </React.Suspense>
      </ThemeProvider>
    </>
  );
};

export default App;
