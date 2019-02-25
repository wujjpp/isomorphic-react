/*
 * Created by Wu Jian Ping on 2019/02/25
 */

import React, { Component, ReactNode } from "react";

interface ILifecycle {
  count: number;
}

export default class Lifecycle extends Component<{}, ILifecycle> {
  constructor(props: any) {
    super(props);
    this.state = {

      count: 0,
    };
  }

  public inc = () => {
    this.setState({ count: this.state.count + 1 });
  }

  public componentDidMount() {
    console.log("componentDidMount"); //tslint:disable-line

  }

  public componentWillMount() {
    console.log("componentWillMount"); //tslint:disable-line

  }

  public componentWillReceiveProps() {
    console.log("componentWillReceiveProps"); //tslint:disable-line

  }

  public componentWillUpdate() {
    console.log("componentWillUpdate"); //tslint:disable-line
  }

  public componentDidUpdate() {
    console.log("componentDidUpdate"); //tslint:disable-line
  }

  public componentWillUnmount() {
    console.log("componentWillUnmount"); //tslint:disable-line
  }

  public componentDidCatch() {
    console.log("componentDidCatch"); //tslint:disable-line
  }

  public render(): ReactNode {
    console.log("render"); //tslint:disable-line

    return (
      <div>
        <div><button onClick={this.inc}>Inc({this.state.count})</button></div>
      </div>
    );
  }
}
