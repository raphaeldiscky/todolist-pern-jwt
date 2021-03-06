import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';

// components
import InputTodo from './todolist/InputTodo';
import ListTodo from './todolist/ListTodo';

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [todosChange, setTodosChange] = useState(false);

  const getProfile = async () => {
    try {
      const response = await fetch('/api/dashboard', {
        method: 'GET',
        headers: { token: localStorage.token } // check if token is valid
      });
      const parseRes = await response.json();
      //console.log(parseRes); // show desc, todo_id, user_id  in console
      setAllTodos(parseRes);
      setName(parseRes[0].user_name); // get the first item => name
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('token');
      setAuth(false);
      toast.success('Logged Out Successfully');
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile(); // useEffect makes a lot of request, so adding a bracket useEffect only makes one request
    setTodosChange(false);
  }, [todosChange]); // watch all todosChange

  return (
    <div>
      <div className='d-flex mt-5 jumbotron justify-content-between'>
        <h1>{_.capitalize(name)} Todolist </h1>
        <button
          className='btn btn-primary rounded-pill btn-xl'
          onClick={(e) => logout(e)}
        >
          Logout
        </button>
      </div>
      <InputTodo setTodosChange={setTodosChange} />
      <ListTodo allTodos={allTodos} setTodosChange={setTodosChange} />
    </div>
  );
};

export default Dashboard;
