import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import "tachyons";

import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { searchRobots } from "./reducers";

// создали store и передали в него reducer
const store = createStore(searchRobots);

// с помощью компонента Provider обернули всё наше приложение и передали ему store как props, Provider это компонент-обёртка, который позволяет не передавать store в каждый компонент по отдельности, а передать store только в Provider, после чего store будет доступен в каждом компоненте в дереве
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
