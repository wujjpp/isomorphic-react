/*
 * Created by Wu Jian Ping on 2019/02/18
 */

import React, { useEffect, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount, componentDidUpdate and componentWillUnmount:
  useEffect(() => {
    console.log("useEffect called"); //tslint:disable-line

    return () => {
      console.log("clean up"); //tslint:disable-line
    };
  });

  const onClickCallback = () => setCount(count + 1);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={onClickCallback}>
        Click me
      </button>
    </div>
  );
};

export default Counter;
