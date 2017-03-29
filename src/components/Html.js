/**
 * Created by JP on 2017/2/7.
 */

import React, {PropTypes, Component} from 'react'
//import ReactDOMStream from "react-dom-stream/server";

class Html extends Component {
  static propTypes = {
    children: PropTypes.string.isRequired,
    //children: PropTypes.object.isRequired,
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    initialState: PropTypes.object, // eslint-disable-line
    helmet: PropTypes.object, // eslint-disable-line
    stylesheets: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    env: PropTypes.string.isRequired
  };

  render() {

    const {children, initialState, scripts, helmet, stylesheets, env} = this.props

    return (
      <html lang="en">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {process.env.NODE_ENV === 'production' && stylesheets && stylesheets.map(css => <link {...css}/>)}
      </head>
      <body>
      <div id="app" dangerouslySetInnerHTML={{__html: children}}/>
      {/*{<div className="container" id="app" dangerouslySetInnerHTML={{__html: __DEV__ ? ReactDOMStream.renderToStaticMarkup(children) : ReactDOMStream.renderToString(children)}}/>}*/}
      {initialState && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.INITIAL_STATE=${JSON.stringify(initialState)};window.__ENV__='${env}'`
          }}
        />
      )}
      {scripts && scripts.map(script => <script key={script} src={script}/>)}
      </body>
      </html>
    )
  }
}

export default Html
