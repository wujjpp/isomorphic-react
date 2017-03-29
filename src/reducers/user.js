/**
 * Created by JP on 2017/2/8.
 */

import * as types from '../constants/user'

import {LOAD_TODO_LIST_SUCCESS} from '../constants/todo'

let initialState = {
  name: ''
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USER_REQUEST:
      return state
    case types.LOAD_USER_SUCCESS:
      return action.payload
    case types.LOAD_USER_ERROR:
      return action.error
    case LOAD_TODO_LIST_SUCCESS://only for testing reducer
      return state
    default:
      return state
  }
}
