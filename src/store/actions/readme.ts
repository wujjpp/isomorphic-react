/*
 * Created by Wu Jian Ping on 2017/2/8.
 */

import * as types from "../constants/readme";

export default function loadReadme() {
  return (dispatch: any, getState: any, { client, axios }: IReduxThunkCustomArgument) => {

    dispatch({ type: types.LOAD_README_REQUEST });

    return client
      .post("/api/loadReadme")
      .then((res: any) => {
        dispatch({
          type: types.LOAD_README_SUCCESS,
          payload: res.data,
        });
      })
      .catch((error: any) => {
        dispatch({
          type: types.LOAD_README_ERROR,
          payload: error,
        });
      });
  };
}
