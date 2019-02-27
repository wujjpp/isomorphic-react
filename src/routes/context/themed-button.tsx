import React, { Component } from "react";
import ThemeContext from "./theme-context";

export default class ThemedButton extends Component {
  public static contextType = ThemeContext;
  public render() {
    return (
      <button style={{ backgroundColor: this.context }}>{this.props.children}</button>
    );
  }
}
