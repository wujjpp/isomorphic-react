/**
 * Created by Wu Jian Ping on 2017/2/8.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { readme } from './readme'

export default history => combineReducers({
  router: connectRouter(history),
  readme
})
