/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import React, { Component, ReactNode } from "react";
import { Helmet } from "react-helmet";

if (__BROWSER__) {
  require("./style.scss");
}

export default class Home extends Component {

  constructor(props: any) {
    super(props);
  }

  public render(): ReactNode {
    return (
      <div>
        <Helmet>
          <title>这是首页</title>
          <meta name="description" content="这是首页的描述" />
          <meta name="keywords" content="这是首页的关键词" />
        </Helmet>
        <h1 className="c1">Home Page</h1>
      </div>
    );
  }
}
