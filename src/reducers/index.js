/**
 * Created by JP on 2017/2/8.
 */

import {
  combineReducers
} from 'redux'
import {
  routerReducer
} from 'react-router-redux'
import {
  user
} from './user'
import {
  todos
} from './todo'

export default combineReducers({
  routing: routerReducer,
  user,
  todos
});
