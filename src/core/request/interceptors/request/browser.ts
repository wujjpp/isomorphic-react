/**
 * Created by Wu Jian Ping on 2017/2/9.
 */

import { AxiosError, AxiosRequestConfig } from "axios";

export default [
  (config: AxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
];
