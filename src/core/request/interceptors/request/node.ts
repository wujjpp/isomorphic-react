/*
 * Created by Wu Jian Ping on 2019/02/19
 */

import { AxiosError, AxiosRequestConfig } from "axios";

export default [
  (config: AxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error),
];
