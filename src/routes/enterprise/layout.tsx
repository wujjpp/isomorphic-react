import React, { Component, ReactNode } from "react";
import { renderRoutes } from "react-router-config";
import Header from "./compoments/head";
import Nav from "./compoments/nav";

interface IOrderProps {
  route: {
    routes: any[];
  };
}

export default class Order extends Component<IOrderProps> {

  public componentDidMount(): void {
    console.log('order mounted')  // tslint:disable-line
  }

  public render(): ReactNode {
    return (
      <div>
        <Header />
        <Nav />
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}
