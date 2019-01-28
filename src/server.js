/**
 * Created by Wu Jian Ping on 2017/1/20.
 */
import express from 'express'
import path from 'path'
import React from 'react'
// import reactHelmet from './core/react-helmet'
import ReactDOMServer from 'react-dom/server'
//import ReactDOMStream from "react-dom-stream/server";
import { StaticRouter } from 'react-router'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

import config from '../settings'
import App from './App'
import Html from './Html'

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

app.get('*', (req, res) => {
  const context = {}
  const children = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  )

  let data = {
    children,
    scripts: [
      (assets && assets.script && assets.script.js) || 'script.js'
    ],
    stylesheets: [
      { rel: 'stylesheet', href: (assets && assets.script && assets.script.css) }
    ],
    env: require('./env.json').env // eslint-disable-line import/no-unresolved
  }

  const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />)

  res.send(`<!doctype html>${html}`)

  // res.send(`
  //   <html lang="en">
  //     <head>
  //         <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
  //         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  //         <meta name="viewport" content="width=device-width, initial-scale=1" />          
  //     </head>
  //     <body>
  //       <div id="app">${html}</div>
  //       <script src="./script.js"></script> 
  //     </body>
  //   </html>
  // `)

  res.end()
})

// for generate html
// app.get('*', (req, res) => {

//   const history = createMemoryHistory(req.originalUrl)

//   match({ routes, history }, (err, redirect, renderProps) => {
//     if (err) {

//       res.status(500).send(err.message)

//     } else if (redirect) {

//       res.redirect(redirect.pathname + redirect.search)

//     } else if (!renderProps) {

//       res.status(404).send('Not Found')

//     } else {
//       const store = configureStore()

//       const { components } = renderProps

//       const { dispatch, getState } = store

//       const data = {
//         scripts: [
//           (assets && assets.script && assets.script.js) || 'script.js'
//         ],
//         stylesheets: [
//           { rel: 'stylesheet', href: (assets && assets.script && assets.script.css) }
//         ],
//         env: require('./env.json').env // eslint-disable-line import/no-unresolved
//       }

//       const locals = {
//         path: renderProps.location.pathname,
//         query: renderProps.location.query,
//         params: renderProps.params,
//         dispatch
//       }

//       trigger('init', components, locals)
//         .then(() => {
//           data.initialState = getState()

//           if (!__DEV__) {
//             data.children = ReactDOMServer.renderToString(
//               <Provider store={store}>
//                 <RouterContext {...renderProps} />
//               </Provider>
//             )
//           }

//           if (__DEV__) {//because of react-dom issue
//             data.children = ReactDOMServer.renderToStaticMarkup(
//               <Provider store={store}>
//                 <RouterContext {...renderProps} />
//               </Provider>
//             )
//           }

//           // data.helmet = reactHelmet.rewind()
//           const html = ReactDOMServer.renderToStaticMarkup(<Html {...data} />)
//           res.send(`<!doctype html>${html}`)

//           /* data.children =
//            <Provider store={store}>
//            <RouterContext {...renderProps} />
//            </Provider>

//            data.helmet = reactHelmet.rewind()

//            res.type('.html')
//            ReactDOMStream.renderToStaticMarkup(<Html {...data} />)
//            .pipe(res)*/

//         })
//         .catch((err2) => {
//           // TODO: add error handler
//           console.log('============') // eslint-disable-line
//           console.log(err2) // eslint-disable-line
//           console.log('============') // eslint-disable-line
//         })
//     }
//   })
// })

const PORT = config.backendPort

app.listen(PORT, (err) => {
  if (err) {
    console.error(err) // eslint-disable-line
  }
  else {
    console.log(`Listening at http://localhost:${PORT}/`) // eslint-disable-line
  }
})
