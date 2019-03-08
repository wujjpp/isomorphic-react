import { observer } from "mobx-react";
import React, { Component } from "react";
import { TodoStore } from "./TodoStore";
import TodoView from "./TodoView";

@observer
export default class TodoList extends Component<{ store: TodoStore }> {

  public componentWillReact() {
    console.log("I will re-render, since the todo has changed!"); //tslint:disable-line
  }

  public render() {
    const store = this.props.store;

    return (
      <div>
        <p>{store.report}</p>
        <p>{store.title}</p>
        <ul>
          {store.todos.map((todo, idx) => <TodoView todo={todo} key={idx} />)}
        </ul>
        <button onClick={this.createTodo}>New Todo</button>
        <small> (double-click a todo to edit)</small>
      </div>
    );
  }

  public createTodo = () => {
    const todo = prompt("Enter a new todo:", `Todo - ${this.props.store.todos.length + 1}`);

    if (todo) {
      this.props.store.addTodo(todo);
    }
  }
}
