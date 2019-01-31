/**
* Created by Wu Jian Ping on 2019/01/30
*/

import express from 'express'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import { matchRoutes, renderRoutes } from 'react-router-config'
import _ from 'lodash'
import Promise from 'bluebird'
import ReactHelmet from 'react-helmet'

import config from '../settings'
import Html from './Html'
import configureStore from './store/configureStore'
import routes from './routes'
import { ServerError } from './routes/common'

// assets list 
const assets = require('./assets.json')
// env defination
const { env } = require('./env.json')

const app = express()

// enable cors
app.use(cors({
  origin: (origin, callback) => {
    callback(null, origin)
  },
  credentials: true
}))

// compression
app.use(compression())

// helmet
app.use(helmet())

// static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/loadReadme', (req, res) => {
  setTimeout(() => {
    res.json({
      name: require('casual').name
    })
  }, 500)
})

app.get('*', (req, res) => {
  const store = configureStore()

  const promises = _
    .chain(matchRoutes(routes, req.url))
    .map(o => {
      if (o.route && o.route.component && _.isFunction(o.route.component.init)) {
        return o.route.component.init({ store, query: req.query, match: o.match })
      } else {
        return Promise.resolve(null)
      }
    })
    .value()

  Promise
    .all(promises)
    .then(() => {
      const context = {}
      const component = <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
      const children = ReactDOMServer.renderToString(component)

      if (context.status === 301) {
        return res.redirect(301, context.url)
      }

      if (context.status === 302) {
        return res.redirect(302, context.url)
      }

      if (context.status === 404) {
        res.status(404)
      }

      // 200
      const data = {
        children,
        scripts: [(assets && assets.script && assets.script.js) || '/script.js'],
        stylesheets: [{ rel: 'stylesheet', href: (assets && assets.script && assets.script.css) }],
        initialState: store.getState(),
        helmet: ReactHelmet.renderStatic(),
        env
      }
      const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />)
      res.send(`<!doctype html>${html}`)
    })
    .catch(err => {
      const data = {
        children: ReactDOMServer.renderToString(<ServerError error={err} />),
        scripts: [(assets && assets.errors && assets.errors.js) || '/errors.js'],
        stylesheets: [{ rel: 'stylesheet', href: (assets && assets.errors && assets.errors.css) }],
        initialState: store.getState(),
        helmet: ReactHelmet.renderStatic(),
        env
      }
      const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />)
      res.status(500).send(`<!doctype html>${html}`)
    })
})

const PORT = config.backendPort

const consoleLogger = console

app.listen(PORT, err => {
  if (err) {
    consoleLogger.error(err)
  }
  else {
    console.log(`Listening at http://localhost:${PORT}/`) // eslint-disable-line
  }
})
