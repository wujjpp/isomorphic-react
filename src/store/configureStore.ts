/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import axios from "axios";
import { applyMiddleware, compose, createStore, StoreEnhancer } from "redux";
import thunk from "redux-thunk";
import createRequest from "../core/request";
import createRootReducer from "./reducers";

export default (initialState: any) => {
  const middlewares: StoreEnhancer[] = [];

  middlewares.push(applyMiddleware(
    thunk.withExtraArgument({
      createRequest,
      axios,
    }),
  ));

  if (__BROWSER__ && __DEV__) {
    middlewares.push(window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f: any) => f);
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    compose(...middlewares),
  );

  // HMR
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers");
      store.replaceReducer(nextRootReducer());
    });
  }

  return store;
};
