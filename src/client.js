/**
 * Created by JP on 2017/2/6.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory, match} from 'react-router'
import {Provider} from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from './routes'
import {trigger} from './core/redial'
import configureStore from './store/configureStore'

const container = document.getElementById('app')
const initialState = window.INITIAL_STATE || {}

// for performance issue, delete useless variables
if (window.INITIAL_STATE) {
  delete window.INITIAL_STATE
}

const store = configureStore(initialState);
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)
//const history = browserHistory

const {dispatch} = store

const render = () => {
  // const {pathname, search, hash} = window.location
  // const location = `${pathname}${search}${hash}`

  match({routes, location}, () => {
    ReactDOM.render(
      <Provider store={store}>
        <Router routes={routes} history={history} />
      </Provider>,
      container
    )
  })

  history.listen((location) => {

    // TODO: perhaps, more conditions are required for judge
    if (location.action === 'REPLACE') {
      return
    }

    match({routes, location}, (error, redirectLocation, renderProps) => {
      if (error) {
        // TODO: error handler is required
        console.log(error)
      }
      else if (redirectLocation) {
        // TODO: redirection is required
        console.log(redirectLocation)
      }
      else if (!renderProps) {
        // TODO: Page Not Found
        console.log('404')
      } else {
        const {components} = renderProps
        const locals = {
          path: renderProps.location.pathname,
          query: renderProps.location.query,
          params: renderProps.params,
          dispatch
        }
        trigger('init', components, locals)
        trigger('defer', components, locals);
      }
    })
  })
}

const subscribe = render()

if (module.hot) {
  module.hot.accept('./routes', () => {
    subscribe()
    setTimeout(render, 0)
  })
}
