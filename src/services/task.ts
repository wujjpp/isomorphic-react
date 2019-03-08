import createRequest from "../core/request";

const loadTasks = (req?: Request) => {
  return createRequest(req).post("/api/tasks/loadTasks", {});
};

export default {
  loadTasks,
};
