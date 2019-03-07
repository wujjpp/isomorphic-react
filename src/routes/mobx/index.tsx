import React from "react";
import TodoList from "./TodoList";
import store from "./TodoStore";

const Mobx = () => (<TodoList store={store} />);

export default Mobx;
