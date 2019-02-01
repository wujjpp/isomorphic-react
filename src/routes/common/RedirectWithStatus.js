/*
 * Created by Wu Jian Ping on 2019/01/31
 */

import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Route } from 'react-router'

const RedirectWithStatus = ({ from, to, status }) => {
  return (<Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = status
    }
    return <Redirect from={from} to={to} />
  }} />)
}

RedirectWithStatus.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string.isRequired,
  status: PropTypes.number
}

export default ({ from, to, status = 301 }) => {
  return () => (RedirectWithStatus({ from, to, status }))
}