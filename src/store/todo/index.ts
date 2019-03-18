
import _ from "lodash";
import { computed, observable, runInAction } from "mobx";
import uuid from "uuid";
import todoService from "../../services/todo";

export interface ITodo {
  todoId: string;
  todoName: string;
  completed: boolean;
}

class TodoStore {

  @observable
  public todos: ITodo[] = [];

  constructor(initialState: any) {
    if (initialState) {
      runInAction(() => {
        this.todos = initialState.todos || [];
      });
    }
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

  public async loadTodo(req?: Request) {
    const data = await todoService.loadTodos(req);

    runInAction(() => {
      this.todos = _.map(data, (o) => ({
        todoId: o.todoId,
        todoName: o.todoName,
        completed: o.completed,
      }));
    });
  }

  public addTodo(todoName: string | null) {
    if (todoName) {
      runInAction(() => {
        this.todos.push({
          todoId: uuid(),
          todoName,
          completed: false,
        });
      });
    }
  }
}

export default TodoStore;
