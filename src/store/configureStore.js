/**
 * Created by Wu Jian Ping on 2017/1/23.
 */

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createRootReducer from './reducers'
import client from '../core/request'
import axios from 'axios'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

export const history = createBrowserHistory()

export default initialState => {

  const middlewares = []

  middlewares.push(applyMiddleware(
    thunk.withExtraArgument({
      client,
      axios
    })
  ))

  middlewares.push(applyMiddleware(
    routerMiddleware(history)
  ))

  if (__BROWSER__ && __DEV__) {
    middlewares.push(window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
  }

  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(...middlewares),
  )

  //HMR
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer(history))
    })
  }

  return store
}