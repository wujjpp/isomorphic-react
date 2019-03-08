import React from "react";
import TodoList from "./TodoList";
import store from "./TodoStore";

export default () => (<TodoList store={store} />);
