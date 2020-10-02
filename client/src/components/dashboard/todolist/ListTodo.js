import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';
import _ from 'lodash';

const ListTodos = ({ allTodos, setTodosChange }) => {
  console.log(allTodos); //get all data back
  const [todos, setTodos] = useState([]); // show empty array

  // delete todo function
  const deleteTodo = async (id) => {
    try {
      await fetch(`/dashboard/todos/${id}`, {
        method: 'DELETE',
        headers: { token: localStorage.token }
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    setTodos(allTodos);
  }, [allTodos]);

  return (
    <Fragment>
      <table className='table mt-5'>
        <thead className='text-center'>
          <th className='col'>Description</th>
          <th className='col-md-auto'>Edit</th>
          <th className='col col-lg-2'>Delete</th>
        </thead>
        <tbody>
          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map((todo) => (
              <tr key={todo.todo_id}>
                <td>{_.capitalize(todo.description)}</td>
                <td>
                  <EditTodo todo={todo} setTodosChange={setTodosChange} />
                </td>
                <td>
                  <button
                    className='btn btn-danger btn-circle m-1'
                    onClick={() => deleteTodo(todo.todo_id)}
                  >
                    <i className='fa fa-trash' />
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
