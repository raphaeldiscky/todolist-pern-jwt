import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// components
import InputTodo from "./todolist/InputTodo";
import ListTodo from "./todolist/ListTodo";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [allTodos, setAllTodos] = useState([]);

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }, // check if token is valid
      });
      const parseRes = await response.json();
      //console.log(parseRes); // show desc, todo_id, user_id  in console
      setAllTodos(parseRes);
      setName(parseRes[0].user_name); // get the first item => name
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getName(); // useEffect makes a lot of request, so adding a bracket useEffect only makes one request
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged Out Successfully");
  };

  return (
    <div>
      <div className="d-flex mt-5 justify-content-around">
        <h1>{name}'s Todo List</h1>
        <button className="btn btn-primary" onClick={(e) => logout(e)}>
          Logout
        </button>
      </div>
      <InputTodo />
      <ListTodo allTodos={allTodos}/>
    </div>
  );
};

export default Dashboard;
