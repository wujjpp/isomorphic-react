/*
 * Created by Wu Jian Ping on 2017/2/8.
 */

import * as types from '../constants/readme'

let initialState = {
  status: 'success',
  data: {},
  times: 0
}

//NOTE: readme决定redux store中的对象名
export const readme = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_README_REQUEST:
      return { ...state, data: {}, status: 'loading' }
    case types.LOAD_README_SUCCESS:
      return { ...state, data: action.payload, status: 'success', times: state.times + 1 }
    case types.LOAD_README_ERROR:
      return { ...state, status: 'error' }
    default:
      return state
  }
}
