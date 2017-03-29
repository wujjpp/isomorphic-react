/**
 * Created by Wu Jian Ping on 2017/1/23.
 */

import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducers from '../reducers'
import client from '../core/request'
import axios from 'axios'

export default (initialState) => {

  const middleware = [];
  middleware.push(applyMiddleware(
    thunk.withExtraArgument({client, axios})
  ));

  if (__BROWSER__ && __DEV__) {
    middleware.push(window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f)
  }

  let store = createStore(reducers, initialState, compose(...middleware))

  //HMR
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
