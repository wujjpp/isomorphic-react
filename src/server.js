/**
 * Created by Wu Jian Ping on 2017/1/20.
 */
import express from 'express'
import path from 'path'
import React from 'react'
import reactHelmet from './core/react-helmet'
import ReactDOMServer from 'react-dom/server'
//import ReactDOMStream from "react-dom-stream/server";
import {match, RouterContext, createMemoryHistory} from 'react-router'
import {Provider} from 'react-redux'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import {trigger} from './core/redial'
import configureStore from './store/configureStore'
import routes from './routes'
import Html from './components/Html'
import config from '../tools/config'

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

// attach api services
app.use('/api', require('./server/api'))

// for generate html
app.get('*', (req, res) => {

  const history = createMemoryHistory(req.originalUrl)

  match({routes, history}, (err, redirect, renderProps) => {
    if (err) {

      res.status(500).send(err.message)

    } else if (redirect) {

      res.redirect(redirect.pathname + redirect.search)

    } else if (!renderProps) {

      res.status(404).send('Not Found')

    } else {
      const store = configureStore()

      const {components} = renderProps

      const {dispatch, getState} = store

      const data = {
        scripts: [
          (assets && assets.script && assets.script.js) || 'script.js'
        ],
        stylesheets: [
          {rel: 'stylesheet', href: (assets && assets.script && assets.script.css)}
        ],
        env: require('./env.json').env // eslint-disable-line import/no-unresolved
      }

      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        dispatch
      }

      trigger('init', components, locals)
        .then(() => {
          data.initialState = getState()

          if (!__DEV__) {
            data.children = ReactDOMServer.renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps}/>
              </Provider>
            )
          }

          if (__DEV__) {//because of react-dom issue
            data.children = ReactDOMServer.renderToStaticMarkup(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            )
          }

          data.helmet = reactHelmet.rewind()
          const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />)
          res.send(`<!doctype html>${html}`)

          /* data.children =
           <Provider store={store}>
           <RouterContext {...renderProps} />
           </Provider>

           data.helmet = reactHelmet.rewind()

           res.type('.html')
           ReactDOMStream.renderToStaticMarkup(<Html {...data} />)
           .pipe(res)*/

        })
        .catch((err2) => {
          // TODO: add error handler
          console.log('============')
          console.log(err2)
          console.log('============')
        })
    }
  })
})

const PORT = config.backendPort

app.listen(PORT, (err) => {
  if (err) {
    console.error(err)
  }
  else {
    console.log(`Listening at http://localhost:${PORT}/`)
  }
})
