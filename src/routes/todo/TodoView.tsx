
import { action } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { ITodo } from "../../store";

@observer
export default class TodoView extends Component<{ todo: ITodo }> {

  public onRename = action(() => {
    const todo = this.props.todo;
    todo.todoName = prompt("Task name", todo.todoName) || todo.todoName;
  });

  public onToggleCompleted = action(() => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  });

  public render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={this.onRename}>
        <input
          id={todo.todoId}
          type="checkbox"
          checked={todo.completed}
          onChange={this.onToggleCompleted}
        />&nbsp;&nbsp;<label htmlFor={todo.todoId}>{todo.todoName}</label>
      </li>
    );
  }
}
