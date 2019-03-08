import { Router } from "express";
import uuid from "uuid";

const router = Router();

router.post("/loadTasks", (req, res) => {
  const results: any[] = [];
  for (let i = 0; i < 3; ++i) {
    results
      .push({
        taskId: uuid(),
        taskName: `Task - ${i + 1}`,
        completed: false,
      });
  }
  res.json(results);
});

export default router;
