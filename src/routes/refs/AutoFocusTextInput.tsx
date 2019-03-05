/*
 * Created by Wu Jian Ping on 2019/03/05
 */

import React, { PureComponent, RefObject } from "react";

import CustomTextInput from "./CustomTextInput";

export default class AutoFocusTextInput extends PureComponent {
  private customTextInput: RefObject<CustomTextInput>;

  constructor(props: {}) {
    super(props);
    this.customTextInput = React.createRef<CustomTextInput>();
  }

  public componentDidMount() {
    if (this.customTextInput.current) {
      this.customTextInput.current.focusTextInput();
    }
  }

  public render() {
    return (
      <CustomTextInput ref={this.customTextInput} />
    );
  }
}
