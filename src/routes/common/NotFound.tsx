/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import * as PropTypes from 'prop-types'
import * as React from 'react'

const NotFound = ({ staticContext = {} }: any) => {
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