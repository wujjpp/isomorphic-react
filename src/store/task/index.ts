import _ from "lodash";
import { computed, observable, runInAction } from "mobx";
import uuid from "uuid";
import taskService from "../../services/task";

export interface ITask {
  taskId: string;
  taskName: string;
  completed: boolean;
}

class TaskStore {

  @observable
  public tasks: ITask[] = [];

  @computed
  get completedTasksCount() {
    return this.tasks.filter((todo) => todo.completed === true).length;
  }

  @computed
  get report() {
    if (this.tasks.length === 0) {
      return "No Task";
    }
    return `Progress: ${this.completedTasksCount}/${this.tasks.length}`;
  }

  constructor(initialState: any) {
    if (initialState) {
      this.tasks = initialState.tasks || [];
    }
  }

  public async loadTask(req?: Request) {
    try {
      const data = await taskService.loadTasks(req);
      runInAction(() => {
        this.tasks = _.map(data, (o) => ({
          taskId: o.taskId,
          taskName: o.taskName,
          completed: o.completed,
        }));
      });
    } catch (e) {
      throw e;
    }
  }

  public addTask(taskName: string | null) {
    if (taskName) {
      runInAction(() => {
        this.tasks.push({
          taskId: uuid(),
          taskName,
          completed: false,
        });
      });
    }
  }
}

export default TaskStore;
