import { useState } from "react";
import Todolist from "../components/TodoList";

const Home = () => {
  const [taskInput, setTaskInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const addTodo = () => {
    fetch("http://localhost:1001/api/todolist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: taskInput }),
    })
      .then((res) => res.json())
      .then(({ success, result, error }) => {
        if (!success) throw error;
        setTodoList(result);
      });
  };

  return (
    <section className="homePage">
      <div>
        <h1>My Todolist</h1>
        <form>
          <input
            type="text"
            placeholder="add a new list"
            onChange={(event) => setTaskInput(event.target.value)}
          />
          <input type="button" value="Add" onClick={addTodo} />
        </form>
      </div>
      <Todolist todoList={todoList} setTodoList={setTodoList} />
    </section>
  );
};

export default Home;
