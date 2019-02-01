/*
 * Created by Wu Jian Ping on 2019/01/31
 */

import * as React from 'react'
import { Redirect, Route } from 'react-router'

interface IProps {
  from: string,
  to: string,
  status: number
}

const RedirectWithStatus = ({ from, to, status }: IProps) => {
  function component({ staticContext }: any) {
    if (staticContext) {
      staticContext.status = status
    }
    return <Redirect from={from} to={to} />
  }
  return (<Route render={component} />)
}

export default ({ from, to, status = 301 }: IProps) => {
  return () => (RedirectWithStatus({ from, to, status }))
}