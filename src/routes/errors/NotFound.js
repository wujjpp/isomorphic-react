import React from 'react'

export default ({ staticContext = {} }) => {
  staticContext.status = 404
  return (
    <div>
      <h1>404 : Not Found</h1>
    </div>
  )
}