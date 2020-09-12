import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// components
import InputTodo from "./todolist/InputTodo";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }, // check if token is valid
      });
      const parseRes = await response.json();
      // console.log(parseRes); // show name in console
      setName(parseRes.user_name);
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
    </div>
  );
};

export default Dashboard;
