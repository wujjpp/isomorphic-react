/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'

import routes from './routes'
import configureStore from './store/configureStore'

const initialState = window.INITIAL_STATE || {}

const store = configureStore(initialState)

// for performance issue, delete useless variables
if (window.INITIAL_STATE) {
  delete window.INITIAL_STATE
}

const render = routeConfigs => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routeConfigs)}
      </BrowserRouter>
    </Provider >,
    document.getElementById('app'),
  )
}

render(routes)

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(require('./routes'))
  })
}
