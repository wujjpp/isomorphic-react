import createRequest from "../core/request";

const loadTodos = (req?: Request) => {
  return createRequest(req).post("/api/todos/loadTodos", {});
};

export default {
  loadTodos,
};
