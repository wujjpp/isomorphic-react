import { Router } from "express";
import uuid from "uuid";

const router = Router();

router.post("/loadTodos", (req, res) => {
  const results: any[] = [];
  for (let i = 0; i < 5; ++i) {
    results
      .push({
        todoId: uuid(),
        todoName: `Todo - ${i + 1}`,
        completed: false,
      });
  }
  res.json(results);
});

export default router;
