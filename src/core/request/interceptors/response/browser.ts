/*
 * Created by Wu Jian Ping on 2019/02/19
 */

import { AxiosError, AxiosResponse } from "axios";

export default [
  (response: AxiosResponse) => response.data,
  (error: AxiosError) => Promise.reject(error),
];
