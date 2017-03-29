/**
 * Created by JP on 2017/2/8.
 */

import * as types from '../constants/todo'

export function loadTodoList() {
  return (dispatch, getState, {client}) => {

    dispatch({ type: types.LOAD_TODO_LIST_REQUEST })

    return client
      .get('/loadTodoList')
      .then((res) => {
        dispatch({
          type: types.LOAD_TODO_LIST_SUCCESS,
          payload: res.data
        })
      })
      .catch((error) => {
        dispatch({
          type: types.LOAD_TODO_LIST_ERROR,
          payload: error
        })
      })
  }
}
