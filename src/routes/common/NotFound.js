/**
* Created by Wu Jian Ping on 2019/01/30
*/

import React from 'react'
import PropTypes from 'prop-types'

const NotFound = ({ staticContext = {} }) => {
  staticContext.status = 404
  return (
    <div>
      <h1>404 : Not Found</h1>
    </div>
  )
}

NotFound.propTypes = {
  staticContext: PropTypes.object.isRequired
}

export default NotFound