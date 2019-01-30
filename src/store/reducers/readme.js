/**
 * Created by Wu Jian Ping on 2017/2/8.
 */

import * as types from '../constants/readme'

let initialState = {
  status: 'success',
  data: {}
}

//NOTE: readme决定redux store中的对象名
export const readme = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_README_REQUEST:
      return { data: {}, status: 'loading' }
    case types.LOAD_README_SUCCESS:
      return { data: action.payload, status: 'success' }
    case types.LOAD_README_ERROR:
      return { ...state, status: 'error' }
    default:
      return state
  }
}
