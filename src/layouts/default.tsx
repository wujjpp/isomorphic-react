/*
 * Created by Wu Jian Ping on 2019/01/30
 */

import React, { Component } from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import Nav from "../components/Nav";
import "../styles/global.scss";

interface IAppRootProps {
  route: {
    routes: RouteConfig[];
  };
}

class AppRoot extends Component<IAppRootProps> {
  public render() {
    return (
      <div>
        <Nav />
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

export default AppRoot;
