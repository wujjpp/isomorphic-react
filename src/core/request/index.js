/**
 * Created by JP on 2017/2/9.
 */

import axios from 'axios'
import config from '../../configs'

import setToken from './interceptors/request/setToken'
import modifyResponse from './interceptors/response/modifyResponse'

const client = axios.create({
  baseURL: config.apiRoot
});

//setup interceptor for request
const [setTokenResolve, setTokenReject] = setToken
client.interceptors.request.use(setTokenResolve, setTokenReject)

//setup interceptor for response
const [modifyResponseResolve, modifyResponseReject] = modifyResponse
client.interceptors.response.use(modifyResponseResolve, modifyResponseReject)

export default client
