/**
* Created by Wu Jian Ping on 2019/01/30
*/

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'

const initialState = window.INITIAL_STATE || {}

// for performance issue, delete useless variables
if (window.INITIAL_STATE) {
  delete window.INITIAL_STATE
}

const store = configureStore(initialState)

const render = () => {
  ReactDOM.hydrate(
    <Provider store={store}>
      <BrowserRouter>
        {renderRoutes(routes)}
      </BrowserRouter>
    </Provider >,
    document.getElementById('app')
  )
}

render()

if (module.hot) {
  module.hot.accept('./routes', () => {
    setTimeout(render, 0)
  })
}
