/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import React, { Component, ReactNode } from "react";
import { Helmet } from "react-helmet";
import data from "./data";
import EnterpriseView from "./EnterpriseView";
import Foo from "./Foo";

import "./style.scss";

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
        <EnterpriseView data={data} />
        <Foo />
      </div>
    );
  }
}
