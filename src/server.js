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
import { renderRoutes } from 'react-router-config'
import routes from './routes'

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
  res.json({
    name: `Jack - ${new Date().getTime()}`
  })
})

app.get('*', (req, res) => {

  const store = configureStore()

  const { url } = req

  const { getState } = store

  const context = {}

  const children = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  )

  const data = {
    children,
    scripts: [
      (assets && assets.script && assets.script.js) || 'script.js'
    ],
    stylesheets: [
      { rel: 'stylesheet', href: (assets && assets.script && assets.script.css) }
    ],
    initialState: getState(),
    env: require('./env.json').env // eslint-disable-line import/no-unresolved
  }

  const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />)

  res.send(`<!doctype html>${html}`)
})

const PORT = config.backendPort

app.listen(PORT, (err) => {
  if (err) {
    console.error(err) // eslint-disable-line
  }
  else {
    console.log(`Listening at http://localhost:${PORT}/`) // eslint-disable-line
  }
})
