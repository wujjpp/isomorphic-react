/**
 * Created by Wu Jian Ping on 2017/2/8.
 */

import * as types from '../constants/readme'

let initialState = {}

//NOTE: readme决定redux store中的对象名
export const readme = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_README_REQUEST:
      return state
    case types.LOAD_README_SUCCESS:
      return action.payload
    case types.LOAD_README_ERROR:
      return action.error
    default:
      return state
  }
}
