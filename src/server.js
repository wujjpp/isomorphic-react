/**
 * Created by Wu Jian Ping on 2017/1/20.
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

import config from '../settings'
import Html from './Html'
import configureStore from './store/configureStore'
import routes from './routes'
import { matchRoutes, renderRoutes } from 'react-router-config'
import _ from 'lodash'
import casual from 'casual'

let assets = null
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

if (process.env.NODE_ENV === 'production') {
  assets = require('./assets.json') // eslint-disable-line import/no-unresolved
}

// static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('/api/loadReadme', (req, res) => {
  setTimeout(() => {
    res.json({
      name: casual.name
    })
  }, 500)
})

app.get('*', (req, res) => {
  const store = configureStore()
  const { url } = req
  const context = {}

  const promises = _
    .chain(matchRoutes(routes, url))
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
      const component = <Provider store={store}>
        <StaticRouter location={url} context={context}>
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

      const data = {
        children,
        scripts: [
          (assets && assets.script && assets.script.js) || '/script.js'
        ],
        stylesheets: [
          { rel: 'stylesheet', href: (assets && assets.script && assets.script.css) }
        ],
        initialState: store.getState(),
        env: require('./env.json').env
      }
      const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />)
      res.send(`<!doctype html>${html}`)
    })
    .catch(err => {
      res.status(500).send(err)
    })

})

const PORT = config.backendPort

app.listen(PORT, err => {
  if (err) {
    console.error(err) // eslint-disable-line
  }
  else {
    console.log(`Listening at http://localhost:${PORT}/`) // eslint-disable-line
  }
})
