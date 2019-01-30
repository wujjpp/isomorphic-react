/**
 * Created by Wu Jian Ping on 2017/2/7.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Html extends Component {

  static propTypes = {
    children: PropTypes.string.isRequired,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    initialState: PropTypes.object,
    stylesheets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    env: PropTypes.string.isRequired
  }

  render() {
    const {
      children,
      initialState,
      scripts,
      stylesheets,
      env
    } = this.props

    return (
      <html lang="en">
        <head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {process.env.NODE_ENV === 'production' && stylesheets && stylesheets.map(css => <link {...css} />)}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {initialState && (<script dangerouslySetInnerHTML={{ __html: `window.INITIAL_STATE=${JSON.stringify(initialState)};window.__ENV__='${env}'` }} />)}
          {scripts && scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    )
  }
}

export default Html
