/**
 * Created by JP on 2017/2/8.
 */

import * as types from '../constants/todo'

let initialState = []

export const todos = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_TODO_LIST_REQUEST:
      return state
    case types.LOAD_TODO_LIST_SUCCESS:
      return action.payload
    case types.LOAD_TODO_LIST_ERROR:
      return action.error
    default:
      return state;
  }
}
