/*
 * Created by Wu Jian Ping on 2019/01/31
 */

import React from 'react'
import Helmet from 'react-helmet'

const Error = error => {
  return (
    <>
      <Helmet>
        <title>错误：{(error && error.message) || '系统错误'}</title>
        <meta name="description" content="这是错误页的描述" />
        <meta name="keywords" content="这是错误页的关键词" />
      </Helmet>
      <div>{(error && error.message) || '系统错误'}</div>
    </>
  )
}

export default Error
