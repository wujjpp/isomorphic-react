/*
 * Created by Wu Jian Ping on 2019/01/31
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router'

const RedirectWithStatus = ({ from, to, status = 301 }) => {
  function component({ staticContext }) {
    if (staticContext) {
      staticContext.status = status
    }

    return <Redirect from={from} to={to} />
  }

  component.propTypes = {
    staticContext: PropTypes.object
  }

  return (<Route render={component} />)
}

RedirectWithStatus.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  status: PropTypes.number.isRequired
}

export default ({ from, to, status = 301 }) => {
  return () => (RedirectWithStatus({ from, to, status }))
}
