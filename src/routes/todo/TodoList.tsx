
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import Helmet from "react-helmet";
import { TodoStore } from "../../store";
import TodoView from "./TodoView";

class TodoList extends Component<{ todoStore: TodoStore }> {
  public componentDidMount() {
    if (this.props.todoStore.todos.length <= 0) {
      this.props.todoStore.loadTodo();
    }
  }

  public render() {
    return (
      <>
        <Helmet>
          <title>这是TODO页</title>
          <meta name="description" content="这是TODO页描述" />
          <meta name="keywords" content="这是TODO关键词" />
        </Helmet>
        <div>
          <h1>Todo App</h1>
          <hr />
          <p>{this.props.todoStore.report}</p>
          <ul>
            {this.props.todoStore.todos.map((todo, idx) => <TodoView todo={todo} key={idx} />)}
          </ul>
          <button onClick={this.createTodo}>New Todo</button>
          <small> (double-click a todo to edit)</small>
        </div>
      </>
    );
  }

  public createTodo = () => {
    const todo = prompt("Enter a new todo:", `Todo - ${this.props.todoStore.todos.length + 1}`);

    if (todo) {
      this.props.todoStore.addTodo(todo);
    }
  }
}

export default inject("todoStore")(observer(TodoList));
