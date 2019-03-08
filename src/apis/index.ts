import express from "express";

const app = express();

app.use("/tasks", require("./task"));

app.use("/todos", require("./todo"));

export default app;
