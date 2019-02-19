/*
 * Created by Wu Jian Ping on 2019/02/02
 */

declare interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  INITIAL_STATE: any;
}

declare interface IActionPayload {
  type: string;
  payload: any;
}

declare interface NodeModule {
  hot: any;
}

declare interface IReduxThunkExtraArgument {
  createRequest: any;
  axios: any;
}