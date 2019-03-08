import { configure } from "mobx";

import TaskStore, { ITask } from "./task";
import TodoStore, { ITodo } from "./todo";

// configure store
configure({ enforceActions: "observed" });

export default class Store {
  public todoStore: TodoStore;
  public taskStore: TaskStore;

  constructor(initialState: { todoStore?: {}, taskStore?: {} } = {}) {
    this.todoStore = new TodoStore(initialState.todoStore);
    this.taskStore = new TaskStore(initialState.taskStore);
  }
}

export {
  ITask,
  TodoStore,
  ITodo,
  TaskStore,
};
