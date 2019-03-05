/*
 * Created by Wu Jian Ping on 2019/03/05
 */

import React from "react";

export default function CustomTextInput2(props: {}) {
  const textInput = React.createRef<HTMLInputElement>();

  const handleClick = () => {
    if (textInput.current) {
      textInput.current.focus();
      textInput.current.select();
    }
  };

  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text input - 2" onClick={handleClick} />
    </div>
  );
}
