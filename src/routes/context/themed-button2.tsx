import React, { Component } from "react";
import ThemeContext from "./theme-context";

export default class ThemedButton2 extends Component {
  public render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => (<button style={{ backgroundColor: theme }}>{this.props.children}</button>)}
      </ThemeContext.Consumer>
    );
  }
}
