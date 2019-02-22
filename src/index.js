import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import "tachyons";

import App from "./containers/App/App";
import * as serviceWorker from "./serviceWorker";
import "./index.css";
import { searchRobots, requestRobots } from "./reducers";

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// т.к. у нас теперь больше чем один reducer, а передать в store мы их должны сразу оба и первым параметром, для этого в redux есть функция combineReducers, объеденяем все редьюсеры и передаём
const rootReducer = combineReducers({ searchRobots, requestRobots });

// создали store и передали в него reducer
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, logger)));

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
