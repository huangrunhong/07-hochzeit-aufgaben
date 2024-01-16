import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Todolist = ({ todoList, setTodoList }) => {
  useEffect(() => {
    fetch(`http://localhost:1001/api/todolist`)
      .then((res) => res.json())
      .then(({ result, success, error }) => {
        if (!success) {
          throw error;
        }
        setTodoList(result);
      });
  }, []);

  const deleteItem = (itemId) => () => {
    const url = `http://localhost:1001/api/todolist/${itemId}`;
    console.log(url);
    fetch(url, { method: "DELETE" })
      .then((res) => res.json())
      .then(({ success, result, error }) => {
        if (!success) throw error;
        return setTodoList(result);
      });
  };

  const toggleStatus = (itemId) => () => {
    console.log(itemId);
    const url = `http://localhost:1001/api/todolist/${itemId}/toggle`;

    fetch(url, { method: "POST" })
      .then((res) => res.json())
      .then(({ success, result, error }) => {
        if (!success) throw error;
        return setTodoList(result);
      });
  };

  return (
    <>
      {todoList ? (
        todoList.map((list) => (
          <div className="todo-list" key={list.id}>
            <button onClick={toggleStatus(list.id)}>
              {list.done ? "✔️" : ""}
            </button>
            <p className={list.done ? "done" : ""}>{list.task}</p>
            <button onClick={deleteItem(list.id)}>-</button>
          </div>
        ))
      ) : (
        <p>List coming</p>
      )}
    </>
  );
};

export default Todolist;
