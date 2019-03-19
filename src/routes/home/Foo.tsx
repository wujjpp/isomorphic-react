import React, { Component } from "react";
import Loadable from "react-loadable";
import Loading from "../../components/Loading";

const LoadableBar = Loadable({
  loader: () => import("./Bar"),
  loading: Loading,
});

export default class MyComponent extends Component {
  public state = { showBar: false };

  public onClick = () => {
    this.setState({ showBar: true });
  }

  public onMouseOver = () => {
    LoadableBar.preload();
  }

  public render() {
    return (
      <div>
        <button onClick={this.onClick} onMouseOver={this.onMouseOver}>
          Show Bar
        </button>
        {this.state.showBar && <LoadableBar />}
      </div>
    );
  }
}
