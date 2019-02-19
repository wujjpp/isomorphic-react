/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import Promise from "bluebird";
import compression from "compression";
import cors from "cors";
import express from "express";
// import heapdump from "heapdump";
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
import Apm from "./core/apm";
import Html from "./Html";
import routes from "./routes";
import { ServerError } from "./routes/common";
import configureStore from "./store/configureStore";

import http, { Agent as HttpAgent } from "http";
import https, { Agent as HttpsAgent } from "https";

http.globalAgent = new HttpAgent({
  keepAlive: true,
  keepAliveMsecs: 60 * 1000,
});

https.globalAgent = new HttpsAgent({
  keepAlive: true,
  keepAliveMsecs: 60 * 1000,
});

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
if (__DEV__) {
  app.use(express.static(path.join(__dirname, "public")));
}
if (!__DEV__) {
  app.use(express.static(path.join(__dirname, "public"), {
    maxAge: "5d",
  }));
}

app.post("/api/loadReadme", (req, res) => {
  res.json({
    name: require("casual").name,
  });
});

// app.get("/heapdump", (req, res) => {
//   heapdump.writeSnapshot(`${Date.now()}.heapsnapshot`, (err: Error, filename: string) => {
//     if (!err) {
//       res.send("success");
//     } else {
//       res.status(500).send(err.message);
//     }
//   });
// });

app.get("*", (req, res) => {
  const store = configureStore({});
  const apm = new Apm(`SSR:${req.originalUrl}`).start();

  const promises = _
    .chain((() => {
      const results = matchRoutes(routes, req.url);
      apm.record("matchRoutes");
      return results;
    })())
    .map((o) => {
      if (o.route && o.route.component) {
        const c = o.route.component as any;
        if (c.init) {
          return c.init({ store, query: req.query, match: o.match, req });
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
      apm.record("resolve promise");
      const context: { status?: number; url?: string } = {};
      const component = (
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );
      apm.record("init component");
      const children = ReactDOMServer.renderToString(component);
      apm.record("render app compnent");
      if (context.status === 301 && context.url) {
        return res.redirect(301, context.url);
      }

      if (context.status === 302 && context.url) {
        return res.redirect(302, context.url);
      }

      if (context.status === 404) {
        res.status(404);
      }

      let scripts: string[] = [];
      if (assets && assets.script && assets.script.js) {
        if (_.isArray(assets.script.js)) {
          scripts = [...assets.script.js];
        } else {
          scripts = [assets.script.js];
        }
      } else {
        scripts = ["/script.js"];
      }

      let stylesheets: Array<{ rel: string, href: string }> = [];
      if (assets && assets.script && assets.script.css) {
        if (_.isArray(assets.script.css)) {
          stylesheets = _.map(assets.script.css, (o, n) => ({ rel: "stylesheet", href: o }));
        } else {
          stylesheets = [{ rel: "stylesheet", href: assets.script.css }];
        }
      }

      // 200
      const data = {
        children,
        scripts,
        stylesheets,
        initialState: store.getState(),
        helmet: ReactHelmet.renderStatic(),
        env,
      };
      const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />);
      apm.record("render HTML");
      res.send(`<!doctype html>${html}`);
      apm.record("send HTML");
      apm.print("ms");
    })
    .catch((err) => {

      let scripts: string[] = [];
      if (assets && assets.errors && assets.errors.js) {
        if (_.isArray(assets.errors.js)) {
          scripts = [...assets.errors.js];
        } else {
          scripts = [assets.errors.js];
        }
      } else {
        scripts = ["/errors.js"];
      }

      let stylesheets: Array<{ rel: string, href: string }> = [];
      if (assets && assets.errors && assets.errors.css) {
        if (_.isArray(assets.errors.css)) {
          stylesheets = _.map(assets.errors.css, (o, n) => ({ rel: "stylesheet", href: o }));
        } else {
          stylesheets = [{ rel: "stylesheet", href: assets.errors.css }];
        }
      }

      const data = {
        children: ReactDOMServer.renderToString(<ServerError error={err} />),
        scripts,
        stylesheets,
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
