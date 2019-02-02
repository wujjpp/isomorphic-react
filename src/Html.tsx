/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import React, { Component } from "react";
import { HelmetData } from "react-helmet";

interface IProps {
  scripts: string[];
  stylesheets: any[];
  initialState: any;
  helmet: HelmetData;
  env: string;
  children: string;
}

class Html extends Component<IProps> {
  public render() {
    const {
      scripts,
      stylesheets,
      initialState,
      helmet,
      children,
      env,
    } = this.props;

    return (
      <html lang="en" {...helmet.htmlAttributes.toComponent()}>
        <head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {helmet.title.toComponent()}
          {helmet.meta.toComponent()}
          {helmet.link.toComponent()}
          {process.env.NODE_ENV === "production" && stylesheets && stylesheets.map((css, n) => <link key={n} {...css} />)}
        </head>
        <body {...helmet.bodyAttributes.toComponent()}>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          {initialState && (<script dangerouslySetInnerHTML={{ __html: `window.INITIAL_STATE=${JSON.stringify(initialState)};window.__ENV__='${env}'` }} />)}
          {scripts && scripts.map((script, n) => <script key={n} src={script} />)}
        </body>
      </html>
    );
  }
}

export default Html;
