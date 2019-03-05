/*
 * Created by Wu Jian Ping on 2019/03/05
 */

import React, { Component } from "react";

export default class CustomTextInput extends Component {
  private textInput: HTMLInputElement;

  constructor(props: {}) {
    super(props);
  }

  public setTextInputRef = (element: HTMLInputElement) => {
    this.textInput = element;
  }

  public focusTextInput = () => {

    if (this.textInput) {
      this.textInput.focus();
      this.textInput.select();
    }
  }

  // public componentDidMount() {
  //   this.focusTextInput();
  // }

  public render() {
    return (
      <div>
        <input type="text" ref={this.setTextInputRef} />
        <input type="button" value="Focus the text input - 3" onClick={this.focusTextInput} />
      </div>
    );
  }
}
