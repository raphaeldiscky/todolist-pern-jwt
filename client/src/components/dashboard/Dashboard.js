import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

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
    toast.success("Logged Out Successfully")
  };

  return (
    <Fragment>
      <h1>{name}'s Dashboard </h1>
      <button className="btn btn-primary" onClick={(e) => logout(e)}>
        Logout
      </button>
    </Fragment>
  );
};

export default Dashboard;
