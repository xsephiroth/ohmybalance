import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import dotenv from "dotenv";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
