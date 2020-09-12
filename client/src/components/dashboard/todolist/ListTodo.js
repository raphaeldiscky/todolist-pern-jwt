import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "./EditTodo";

const ListTodos = ({ allTodos, setTodosChange}) => {
  console.log(allTodos); //get all data back
  const [todos, setTodos] = useState([]); // show empty array

  // delete todo function
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: {token: localStorage.token}
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // const getTodos = async () => {
  //   try {
  //     const response = await fetch("/todos");
  //     const jsonData = await response.json(); //get data back with parsing the response
  //     setTodos(jsonData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // create useEffect to watch allTodos changes
  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} setTodosChange={setTodosChange}/>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
