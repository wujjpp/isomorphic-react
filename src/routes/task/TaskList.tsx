
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import Helmet from "react-helmet";
import { TaskStore } from "../../store";
import TaskView from "./TaskView";

class TaskList extends Component<{ taskStore: TaskStore }> {

  public componentDidMount() {
    if (this.props.taskStore.tasks.length <= 0) {
      this.props.taskStore.loadTask();
    }
  }

  public render() {
    const store = this.props.taskStore;

    return (
      <>
        <Helmet>
          <title>这是TASK页</title>
          <meta name="description" content="这是TASK页描述" />
          <meta name="keywords" content="这是TASK关键词" />
        </Helmet>
        <div>
          <p>{store.report}</p>
          <ul>
            {store.tasks.map((task, idx) => <TaskView task={task} key={idx} />)}
          </ul>
          <button onClick={this.createTodo}>New Task</button>
          <small> (double-click a task to edit)</small>
        </div>
      </>
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

export default inject("taskStore")(observer(TaskList));
