/*
 * Created by Wu Jian Ping on 2019/03/05
 */

import React, { PureComponent } from "react";

export default class CustomTextInput extends PureComponent {

  private textInput: any;

  constructor(props: any) {
    super(props);
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  public focusTextInput() {
    this.textInput.current.focus();
    this.textInput.current.select();
  }

  public render() {
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    );
  }
}
