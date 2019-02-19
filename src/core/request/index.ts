/**
 * Created by Wu Jian Ping on 2017/2/9.
 */

import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

let requestResolve = (config: AxiosRequestConfig) => config;
let requestReject = (error: AxiosError) => Promise.reject(error);

let responseResolve = (response: AxiosResponse) => response;
let responseReject = (error: AxiosError) => Promise.reject(error);

if (__BROWSER__) {
  [requestResolve, requestReject] = require("./interceptors/request/browser");
  [responseResolve, responseReject] = require("./interceptors/response/browser");
}

if (!__BROWSER__) {
  [requestResolve, requestReject] = require("./interceptors/request/node");
  [responseResolve, responseReject] = require("./interceptors/response/node");
}

const setupinterceptors = (instance: AxiosInstance) => {
  // setup interceptor for request
  instance.interceptors.request.use(requestResolve, requestReject);
  // setup interceptor for response
  instance.interceptors.response.use(responseResolve, responseReject);
};

let createRequest: (req?: Request) => AxiosInstance = (req) => axios.create({});

if (__BROWSER__) {
  const apiRoot = `${window.location.protocol}//${window.location.host}`;
  createRequest = () => {
    const clientRequest = axios.create({
      baseURL: apiRoot,
    });
    setupinterceptors(clientRequest);

    return clientRequest;
  };
}

if (!__BROWSER__) {
  const port = require("../../../settings").default.backendPort;
  const apiRoot = `http://127.0.0.1:${port}`;

  createRequest = (req?: Request) => {
    if (!req) {
      throw new Error("req must not be null");
    }
    const config: any = {
      baseURL: apiRoot,
    };
    if (req && req.headers) {
      config.headers = req.headers;
    }
    const serverRequest = axios.create(config);
    setupinterceptors(serverRequest);
    return serverRequest;
  };
}

export default createRequest;
