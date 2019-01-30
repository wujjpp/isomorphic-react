/**
* Created by Wu Jian Ping on 2019/01/30
*/

import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import createRootReducer from './reducers'
import client from '../core/request'
import axios from 'axios'

export default initialState => {

  const middlewares = []

  middlewares.push(applyMiddleware(
    thunk.withExtraArgument({
      client,
      axios
    })
  ))

  if (__BROWSER__ && __DEV__) {
    middlewares.push(window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
  }

  const store = createStore(
    createRootReducer(),
    initialState,
    compose(...middlewares),
  )

  //HMR
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer())
    })
  }

  return store
}