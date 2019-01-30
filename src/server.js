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
import App from './App'
import { match } from './routes'

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
      name: 'Jack'
    })
  }, 500)
})

app.get('*', (req, res) => {

  const store = configureStore()

  const { url } = req

  const { getState } = store

  const context = {}

  let { matched, components } = match(req.url)

  console.log(matched)
  console.log(components)

  const component = <Provider store={store}>
    <StaticRouter location={url} context={context}>
      <App />
    </StaticRouter>
  </Provider>

  const children = ReactDOMServer.renderToString(component)

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
