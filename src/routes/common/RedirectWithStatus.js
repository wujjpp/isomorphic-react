/**
* Created by Wu Jian Ping on 2019/01/31
*/

import React from 'react'
import { Route, Redirect } from 'react-router'
import PropTypes from 'prop-types'

const Component = ({ from, to, status = 301 }) => {
  return (<Route render={({ staticContext }) => {
    if (staticContext) staticContext.status = status
    return <Redirect from={from} to={to} />
  }} />)
}

Component.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string.isRequired,
  status: 301 | 302
}

export default Component