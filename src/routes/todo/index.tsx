
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import Store, { TodoStore } from "../../store";
import TodoView from "./TodoView";

class TodoApp extends Component<{ todoStore: TodoStore }> {

  public static init({ store, req, query, match }: { store: Store, req?: Request, query: any, match: any }) {
    return store.todoStore.loadTodo(req);
  }

  public componentDidMount() {
    if (this.props.todoStore.todos.length <= 0) {
      this.props.todoStore.loadTodo();
    }
  }

  public render() {
    return (
      <div>
        <p>{this.props.todoStore.report}</p>
        <ul>
          {this.props.todoStore.todos.map((todo, idx) => <TodoView todo={todo} key={idx} />)}
        </ul>
        <button onClick={this.createTodo}>New Todo</button>
        <small> (double-click a todo to edit)</small>
      </div>
    );
  }

  public createTodo = () => {
    const todo = prompt("Enter a new todo:", `Todo - ${this.props.todoStore.todos.length + 1}`);

    if (todo) {
      this.props.todoStore.addTodo(todo);
    }
  }
}

export default inject("todoStore")(observer(TodoApp));
