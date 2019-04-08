/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import Promise from "bluebird";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http, { Agent as HttpAgent } from "http";
import https, { Agent as HttpsAgent } from "https";
import _ from "lodash";
import { toJS } from "mobx";
import { Provider, useStaticRendering } from "mobx-react";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import ReactHelmet from "react-helmet";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import { StaticRouter } from "react-router";
import { matchRoutes, renderRoutes } from "react-router-config";
import config from "../settings";
import Html from "./components/Html";
import Apm from "./core/apm";
import routes from "./routes";
import { ServerError } from "./routes/common";
import Store from "./store";

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
// react-loadable
const stats = require("./react-loadable.json");

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

// setup body-parser
app.use(bodyParser.json({ limit: "5000kb" }));
app.use(bodyParser.raw({ limit: "5000kb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "5000kb" }));
app.use(bodyParser.text({ type: "text/xml" }));

// setup cookie-parser
app.use(cookieParser());

app.use("/api", require("./apis"));

useStaticRendering(true);

app.get("*", (req, res) => {
  const apm = new Apm(`SSR:${req.originalUrl}`).start();

  const store = new Store();

  const promises = _
    .chain((() => {
      const results = matchRoutes(routes, req.path);
      apm.mark("matchRoutes");
      return results;
    })())
    .map((o) => {
      if (o.route && o.route.component) {
        const c = o.route.component as any;
        if (c.init) {
          return c.init({ store, query: req.query, params: o.match.params, match: o.match, req });
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
      apm.mark("resolve promise");

      const modules: any[] = [];

      const context: { status?: number; url?: string } = {};

      const collect = (moduleName: string) => modules.push(moduleName);

      const component = (
        <Loadable.Capture report={collect}>
          <StaticRouter location={req.url} context={context}>
            <Provider {...store}>
              {renderRoutes(routes)}
            </Provider>
          </StaticRouter>
        </Loadable.Capture>
      );

      apm.mark("init component");
      const children = ReactDOMServer.renderToString(component);
      apm.mark("render app compnent");

      if (context.status === 301 && context.url) {
        return res.redirect(301, context.url);
      }

      if (context.status === 302 && context.url) {
        return res.redirect(302, context.url);
      }

      if (context.status === 404) {
        res.status(404);
      }

      const bundles = getBundles(stats, modules);

      // Prepare scripts
      let scripts: string[] = [];

      const js = _.filter(bundles, (bundle) => bundle.file.endsWith(".js"));
      js.forEach((o: any) => {
        scripts.push(o.publicPath);
      });

      if (assets && assets.script && assets.script.js) {
        if (_.isArray(assets.script.js)) {
          scripts = _.concat([...scripts], [...assets.script.js]);
        } else {
          scripts = _.concat([...scripts], [assets.script.js]);
        }
      } else {
        scripts = _.concat([...scripts], ["/script.js"]);
      }
      scripts = _.uniqWith(scripts);

      // Prepare stylesheets
      let stylesheets: string[] = [];
      if (assets && assets.script && assets.script.css) {
        if (_.isArray(assets.script.css)) {
          stylesheets = [...assets.script.css];
        } else {
          stylesheets = [assets.script.css];
        }
      }

      const css = _.filter(bundles, (bundle) => bundle.file.endsWith(".css"));
      if (css.length > 0) {
        css.forEach((o: any) => {
          stylesheets.push(o.publicPath);
        });
      }
      stylesheets = _.uniqWith(stylesheets);

      // 200
      const data = {
        children,
        scripts,
        stylesheets: _.map(stylesheets, (s) => ({ rel: "stylesheet", href: s })),
        initialState: toJS(store),
        helmet: ReactHelmet.renderStatic(),
        env,
      };
      const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />);
      apm.mark("render HTML");
      res.send(`<!doctype html>${html}`);
      apm.mark("send HTML");
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
        initialState: toJS(store),
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

Loadable
  .preloadAll()
  .then(() => {
    const server = app.listen(PORT, (err: Error) => {
      if (err) {
        consoleLogger.error(err);
      } else {
        consoleLogger.log(`Listening at http://localhost:${PORT}/`);
      }
    });

    process.on("SIGTERM", () => {
      consoleLogger.log("Process received 'SIGTERM'");
      server.close(() => {
        consoleLogger.log("Server graceful shutdown");
        process.exit(0);
      });
    });
  });
