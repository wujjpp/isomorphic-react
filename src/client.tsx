/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom";
import Loadable from "react-loadable";
import { renderRoutes, RouteConfig } from "react-router-config";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes";
import Store from "./store";

const initialState = window.INITIAL_STATE || {};

// for performance issue, delete useless variables
if (window.INITIAL_STATE) {
  delete window.INITIAL_STATE;
}

const store = new Store(initialState);

const render = (routeConfigs: RouteConfig[]) => {
  Loadable
    .preloadReady()
    .then(() => {
      ReactDOM.hydrate(
        <BrowserRouter>
          <Provider {...store}>
            {renderRoutes(routeConfigs)}
          </Provider>
        </BrowserRouter>,
        document.getElementById("app"),
      );
    });
};

render(routes);

if (module.hot) {
  module.hot.accept("./routes", () => {
    render(require("./routes"));
  });
}
