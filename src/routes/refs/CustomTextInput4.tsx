import React, { PureComponent } from "react";

interface IProps {
  inputRef: (el: HTMLInputElement) => void;
}

function CustomTextInput(props: IProps) {
  return <input ref={props.inputRef} />;
}

export default class Parent extends PureComponent {

  private inputElement: HTMLInputElement;

  public callbackRefs = (el: HTMLInputElement) => { this.inputElement = el; };

  public selectAndFocus = () => {
    if (this.inputElement) {
      this.inputElement.focus();
      this.inputElement.select();
    }
  }

  public render() {
    return (
      <>
        <CustomTextInput inputRef={this.callbackRefs} />
        <button onClick={this.selectAndFocus}>Focus the text input - 4</button>
      </>
    );
  }
}
