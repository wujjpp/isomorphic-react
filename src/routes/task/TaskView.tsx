
import { action } from "mobx";
import { observer } from "mobx-react";
import React, { Component } from "react";
import { ITask } from "../../store";

@observer
export default class TaskView extends Component<{ task: ITask }> {

  public onToggleCompleted = action(() => {
    const task = this.props.task;
    task.completed = !task.completed;
  });

  public onRename = action(() => {
    const task = this.props.task;
    task.taskName = prompt("Task name", task.taskName) || task.taskName;
  });

  public render() {
    const task = this.props.task;
    return (
      <li onDoubleClick={this.onRename}>
        <input
          id={task.taskId}
          type="checkbox"
          checked={task.completed}
          onChange={this.onToggleCompleted}
        />&nbsp;&nbsp;<label htmlFor={task.taskId}>{task.taskName}</label>
      </li>
    );
  }
}
