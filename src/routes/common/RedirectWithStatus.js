/**
* Created by Wu Jian Ping on 2019/01/31
*/

import React from 'react'
import { Route, Redirect } from 'react-router'
import PropTypes from 'prop-types'

const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = status
    }
    return <Redirect from={from} to={to} />
  }} />)

RedirectWithStatus.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string.isRequired,
  status: 301 | 302
}

export default ({ from, to, status = 301 }) => {
  return () => (RedirectWithStatus({ from, to, status }))
}