import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom"; // Link => guide us back to register route
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
      // console.log(parseRes);
      // parseRes is object

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Login Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes); // show password and email incorrect from jwtAuth.js
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div class="container-fluid">
        <div class="row no-gutter">
          <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
          <div class="col-md-8 col-lg-6">
            <div class="login d-flex align-items-center py-5">
              <div class="container">
                <div class="row">
                  <div class="col-md-9 col-lg-8 mx-auto">
                    <h3 class="login-heading mb-4 text-center">Welcome back!</h3>
                    <form onSubmit={onSubmitForm}>
                      <div class="form-label-group">
                        <input
                          type="email"
                          name="email"
                          id="inputEmail"
                          class="form-control"
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => onChange(e)}
                          required
                          autofocus
                        />
                        <label for="inputEmail">Email address</label>
                      </div>

                      <div class="form-label-group">
                        <input
                          type="password"
                          name="password"
                          id="inputPassword"
                          class="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => onChange(e)}
                          required
                        />
                        <label for="inputPassword">Password</label>
                      </div>
                      <button
                        class="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                        type="submit"
                      >
                        Login
                      </button>
                      <div class="text-center">
                        <Link class="small" to="/register">
                          Sign Up
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <h1 className="text-center my-5">Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        ></input>
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/register">Register</Link> */}
    </Fragment>
  );
};

export default Login;
