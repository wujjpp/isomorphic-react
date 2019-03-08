import { action, autorun, computed, configure, observable } from "mobx";

configure({
  enforceActions: "observed",
});

export interface ITask {
  taskName: string;
  completed: boolean;
  assignee: string | null;
}

export class TodoStore {

  @observable
  public todos: ITask[] = [];

  @observable
  public title: string = "total: 0";

  constructor() {
    autorun(() => console.log(this.report)); // tslint:disable-line
  }

  @computed
  get completedTodosCount() {
    return this.todos.filter((todo) => todo.completed === true).length;
  }

  @computed
  get report() {
    if (this.todos.length === 0) {
      return "No Todo";
    }
    return `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  @action
  public addTodo(taskName: string | null) {
    if (taskName) {
      this.todos.push({
        taskName,
        completed: false,
        assignee: null,
      });
      this.title = `total:${this.todos.length}`;
    }
  }
}

export default new TodoStore();
