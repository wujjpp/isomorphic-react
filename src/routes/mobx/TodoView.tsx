
import { action } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import uuid from "uuid";
import { ITask } from "./TodoStore";

@observer
export default class TodoView extends Component<{ todo: ITask }> {
  private id: string;

  public componentWillMount() {
    this.id = uuid();
  }

  public render() {
    const todo = this.props.todo;
    return (
      <li onDoubleClick={this.onRename}>
        <input
          id={this.id}
          type="checkbox"
          checked={todo.completed}
          onChange={this.onToggleCompleted}
        />&nbsp;&nbsp;<label htmlFor={this.id}>{todo.taskName}</label>
      </li>
    );
  }

  @action
  public onToggleCompleted = () => {
    const todo = this.props.todo;
    todo.completed = !todo.completed;
  }

  @action
  public onRename = () => {
    const todo = this.props.todo;
    todo.taskName = prompt("Task name", todo.taskName) || todo.taskName;
  }
}
