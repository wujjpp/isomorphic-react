/**
* Created by Wu Jian Ping on 2019/01/30
*/

import React from 'react'
import Helmet from 'react-helmet'

const About = () => {
  return (
    <div>
      <Helmet>
        <title>这是关于页</title>
        <meta name="description" content="这是关于页的描述"></meta>
        <meta name="keywords" content="这是关于页的关键词"></meta>
      </Helmet>
      <h2>About Page</h2>
    </div>
  )
}

export default About