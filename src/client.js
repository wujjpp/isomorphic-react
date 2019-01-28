/**
 * Created by Wu Jian Ping on 2017/2/6.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store/configureStore'

import App from './App'

const initialState = window.INITIAL_STATE || {}

// for performance issue, delete useless variables
if (window.INITIAL_STATE) {
  delete window.INITIAL_STATE
}

const store = configureStore(initialState)

ReactDOM.hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider >,
  document.getElementById('app')
)


// const render = () => {
//   console.log(window.location)
//   // const {pathname, search, hash} = window.location
//   // const location = `${pathname}${search}${hash}`

//   ReactDOM.render(
//     <Provider store={store}>
//       <Router history={history}>
//         <App />
//       </Router>
//     </Provider>,
//     document.getElementById('app')
//   )

//   history.listen((location) => {

//     match({ routes, location }, (error, redirectLocation, renderProps) => {
//       if (error) {
//         // TODO: error handler is required
//         console.log(error) // eslint-disable-line
//       }
//       else if (redirectLocation) {
//         // TODO: redirection is required
//         console.log(redirectLocation) // eslint-disable-line
//       }
//       else if (!renderProps) {
//         // TODO: Page Not Found
//         console.log('404') // eslint-disable-line
//       } else {
//         const { components } = renderProps
//         const locals = {
//           path: renderProps.location.pathname,
//           query: renderProps.location.query,
//           params: renderProps.params,
//           dispatch
//         }
//         trigger('init', components, locals)
//         trigger('defer', components, locals)
//       }
//     })
//   })
// }

// const subscribe = render()

// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     subscribe()
//     setTimeout(render, 0)
//   })
// }



// const render = () => {
//   ReactDOM.render(
//     <Router>
//       <App />
//     </Router>,
//     document.getElementById('app')
//   )
// }

// render()


