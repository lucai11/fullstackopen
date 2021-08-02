import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Route } from "react-router-dom";
import Routes from "./Routes";
import "./index.css";
import App from './App.js'

const Main: React.FC = () => (
  <HashRouter>
    <Routes />
    <App />
  </HashRouter>
);

ReactDOM.render(<Main />, document.querySelector("#root"));
