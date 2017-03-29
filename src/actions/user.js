/**
 * Created by JP on 2017/2/8.
 */

import * as types from '../constants/user'

export function loadUser() {
  return (dispatch, getState, {client}) => {

    dispatch({type: types.LOAD_USER_REQUEST})

    return client
      .get('/loadUser')
      .then((res) => {
        dispatch({
          type: types.LOAD_USER_SUCCESS,
          payload: res.data
        })
      })
      .catch((error) => {
        dispatch({
          type: types.LOAD_USER_ERROR,
          payload: error,
          error: true
        })
      })
  }
}
