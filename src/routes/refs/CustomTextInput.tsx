
/*
 * Created by Wu Jian Ping on 2019/03/05
 */

import React, { PureComponent, RefObject } from "react";

export default class CustomTextInput extends PureComponent {

  private textInput: RefObject<HTMLInputElement>;

  constructor(props: {}) {
    super(props);
    this.textInput = React.createRef<HTMLInputElement>();
  }

  public focusTextInput = () => {
    if (this.textInput.current) {
      this.textInput.current.focus();
      this.textInput.current.select();
    }
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
