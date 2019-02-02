/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import Promise from "bluebird";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import _ from "lodash";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import ReactHelmet from "react-helmet";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";
import { matchRoutes, renderRoutes } from "react-router-config";
import config from "../settings";
import Html from "./Html";
import routes from "./routes";
import { ServerError } from "./routes/common";
import configureStore from "./store/configureStore";

// assets list
const assets = require("./assets.json");
// env defination
const { env } = require("./env.json");

const app = express();

// enable cors
app.use(cors({
  // origin: (origin, callback) => {
  //   callback(null, origin);
  // },
  credentials: true,
}));

// compression
app.use(compression());

// helmet
app.use(helmet());

// static folder
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/loadReadme", (req, res) => {
  setTimeout(() => {
    res.json({
      name: require("casual").name,
    });
  }, 500);
});

app.get("*", (req, res) => {
  const store = configureStore({});

  const promises = _
    .chain(matchRoutes(routes, req.url))
    .map((o) => {
      if (o.route && o.route.component) {
        const c = o.route.component as any;
        if (c.init) {
          return c.init({ store, query: req.query, match: o.match });
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    })
    .value();

  Promise
    .all(promises)
    .then(() => {
      const context: { status?: number; url?: string } = {};
      const component = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );
      const children = ReactDOMServer.renderToString(component);

      if (context.status === 301 && context.url) {
        return res.redirect(301, context.url);
      }

      if (context.status === 302 && context.url) {
        return res.redirect(302, context.url);
      }

      if (context.status === 404) {
        res.status(404);
      }

      // 200
      const data = {
        children,
        scripts: [(assets && assets.script && assets.script.js) || "/script.js"],
        stylesheets: [{ rel: "stylesheet", href: (assets && assets.script && assets.script.css) }],
        initialState: store.getState(),
        helmet: ReactHelmet.renderStatic(),
        env,
      };
      const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />);
      res.send(`<!doctype html>${html}`);
    })
    .catch((err) => {
      const data = {
        children: ReactDOMServer.renderToString(<ServerError error={err} />),
        scripts: [(assets && assets.errors && assets.errors.js) || "/errors.js"],
        stylesheets: [{ rel: "stylesheet", href: (assets && assets.errors && assets.errors.css) }],
        initialState: store.getState(),
        helmet: ReactHelmet.renderStatic(),
        env,
      };
      const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />);
      res
        .status(500)
        .send(`<!doctype html>${html}`);
    });
});

const PORT = config.backendPort;

const consoleLogger = console;

app.listen(PORT, (err: Error) => {
  if (err) {
    consoleLogger.error(err);
  } else {
    consoleLogger.log(`Listening at http://localhost:${PORT}/`) // tslint:disable-line
  }
});
