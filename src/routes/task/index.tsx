
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { IInit, TaskStore } from "../../store";
import TaskView from "./TaskView";

class TaskApp extends Component<{ taskStore: TaskStore }> {
  public static init({ store, req }: IInit) {
    return store.taskStore.loadTask(req);
  }

  public componentDidMount() {
    if (this.props.taskStore.tasks.length <= 0) {
      this.props.taskStore.loadTask();
    }
  }

  public render() {
    const store = this.props.taskStore;

    return (
      <div>
        <p>{store.report}</p>
        <ul>
          {store.tasks.map((task, idx) => <TaskView task={task} key={idx} />)}
        </ul>
        <button onClick={this.createTodo}>New Task</button>
        <small> (double-click a task to edit)</small>
      </div>
    );
  }

  public createTodo = () => {
    const store = this.props.taskStore;
    const task = prompt("Enter a new task:", `Task - ${store.tasks.length + 1}`);

    if (task) {
      store.addTask(task);
    }
  }
}

export default inject("taskStore")(observer(TaskApp));
