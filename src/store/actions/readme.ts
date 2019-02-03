/*
 * Created by Wu Jian Ping on 2017/2/8.
 */

import { Dispatch, Store } from "redux";
import * as types from "../constants/readme";

export default function loadReadme() {
  return (dispatch: Dispatch, getState: Store, { client }: IReduxThunkExtraArgument) => {

    dispatch({ type: types.LOAD_README_REQUEST });

    return client
      .post("/api/loadReadme")
      .then((res) => {
        dispatch({
          type: types.LOAD_README_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: types.LOAD_README_ERROR,
          payload: error,
        });
      });
  };
}
