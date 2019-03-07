import { autorun, computed, observable } from "mobx";

export interface ITask {
  taskName: string;
  completed: boolean;
  assignee: string | null;
}

export class TodoStore {

  @observable
  public todos: ITask[] = [];

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
      return "<none>";
    }
    return `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  public addTodo(taskName: string | null) {
    if (taskName) {
      this.todos.push({
        taskName,
        completed: false,
        assignee: null,
      });
    }
  }
}

export default new TodoStore();
