/**
* Created by Wu Jian Ping on 2019/01/30
*/

import React from 'react'

export default ({ staticContext = {}, ...rest }) => {
  staticContext.status = 404
  return (
    <div>
      <h1>404 : Not Found</h1>
    </div>
  )
}