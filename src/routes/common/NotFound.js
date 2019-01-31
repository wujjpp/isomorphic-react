/**
* Created by Wu Jian Ping on 2019/01/30
*/

import React from 'react'
import PropTypes from 'prop-types'

const Component = ({ staticContext = {} }) => {
  staticContext.status = 404
  return (
    <div>
      <h1>404 : Not Found</h1>
    </div>
  )
}

Component.propTypes = {
  staticContext: PropTypes.object.isRequired
}

export default Component