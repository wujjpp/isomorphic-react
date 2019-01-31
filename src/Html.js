/**
* Created by Wu Jian Ping on 2019/01/30
*/

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Html extends Component {
  static propTypes = {
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    stylesheets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    initialState: PropTypes.object,
    helmet: PropTypes.object,
    children: PropTypes.string.isRequired,
    env: PropTypes.string.isRequired
  }

  render() {
    const {
      scripts,
      stylesheets,
      initialState,
      helmet,
      children,
      env
    } = this.props

    return (
      <html {...helmet.htmlAttributes.toComponent()}>
        <head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {process.env.NODE_ENV === 'production' && stylesheets && stylesheets.map((css, n) => <link key={n} {...css} />)}
        </head>
        <body {...helmet.bodyAttributes.toComponent()}>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {initialState && (<script dangerouslySetInnerHTML={{ __html: `window.INITIAL_STATE=${JSON.stringify(initialState)};window.__ENV__='${env}'` }} />)}
          {scripts && scripts.map((script, n) => <script key={n} src={script} />)}
        </body>
      </html>
    )
  }
}

export default Html