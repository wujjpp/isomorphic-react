import React, { Component } from "react";
import ThemeContext from "./theme-context";
import ThemedButton from "./themed-button";
import ThemedButton2 from "./themed-button2";

export default class Context extends Component {

  public render() {
    return (
      <ThemeContext.Provider value="#0f0">
        <ThemedButton>Test1-1</ThemedButton>
        <ThemedButton2>Test2-1</ThemedButton2>
        <div>
          <ThemeContext.Provider value="#f00">
            <ThemedButton>Test1-2</ThemedButton>
            <ThemedButton2>Test2-2</ThemedButton2>
          </ThemeContext.Provider>
        </div>
      </ThemeContext.Provider>
    );
  }
}
