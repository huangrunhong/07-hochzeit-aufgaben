const express = require("express");
const cors = require("cors");
const app = express();

const { readJsonFile, writeJsonFile } = require("./fsUnit");

app.use(cors());

app.use((req, _, next) => {
  console.log("new request", req.method, req.url);
  next();
});

app.use(express.json());

app.get("/api/todolist", (req, res) =>
  readJsonFile("./todos.json")
    .then((lists) =>
      lists.map((list) => ({ id: list.id, task: list.task, done: list.done }))
    )
    .then((data) => {
      console.log(data);
      res.json({ success: true, result: data });
    })
);

app.post("/api/todolist", (req, res) => {
  const newTodo = {
    id: Date.now(),
    task: req.body.task,
    done: false,
  };
  readJsonFile("./todos.json")
    .then((lists) => [...lists, newTodo])
    .then((newTodoListsArray) =>
      writeJsonFile("./todos.json", newTodoListsArray)
    )
    .then((newTodoListsArray) => {
      res.json({ success: true, result: newTodoListsArray });
    });
});

app.post("/api/todolist/:todoId/toggle", (req, res) => {
  const todoId = req.params.todoId;
  readJsonFile("./todos.json")
    .then((lists) => {
      const updatedTodos = lists.map((list) => {
        if (list.id.toString() === todoId) {
          return { ...list, done: !list.done };
        } else {
          return list;
        }
      });
      return updatedTodos;
    })
    .then((newTodoListsArray) =>
      writeJsonFile("./todos.json", newTodoListsArray)
    )
    .then((newTodoListsArray) =>
      res.status(200).json({ success: true, result: newTodoListsArray })
    )
    .catch((err) =>
      res.status(500).json({ success: false, error: "failed to change Todo" })
    );
});

app.delete("/api/todolist/:todoId", (req, res) => {
  const todoId = req.params.todoId;
  readJsonFile("./todos.json")
    .then((lists) => {
      const listWithoutDeletedItem = lists.filter(
        (list) => list.id.toString() !== todoId
      );
      writeJsonFile("./todos.json", listWithoutDeletedItem);
      res.status(200).json({ success: true, result: listWithoutDeletedItem });
    })
    .catch((err) =>
      res.status(500).json({ success: false, error: "failed to change Todo" })
    );
});

const PORT = 1001;
app.listen(PORT, () => console.log("server at Port:" + PORT));
