import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      // make fetch request, default of fetch request is get request
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }); //data we get back is gonna be json, so we must parse it
      const parseRes = await response.json();
      //console.log(parseRes); //we will get jwt Token

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token); // store token in local storage
        setAuth(true);
        toast.success("Registered Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes); // show user already exist from jwtAuth.js
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
                    <h3 class="login-heading mb-4 text-center">Register</h3>
                    <form onSubmit={onSubmitForm}>
                      <div class="form-label-group">
                        <input
                          type="text"
                          name="name"
                          id="inputUsername"
                          class="form-control"
                          placeholder="Username"
                          value={name}
                          onChange={(e) => onChange(e)}
                          required
                          autofocus
                        />
                        <label for="inputEmail">Username</label>
                      </div>
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
                        Register
                      </button>
                      <div class="text-center">
                        <Link class="small" to="/login">
                          Sign In
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
      {/* <h1 className="text-center my-5">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control my-3"
          value={email}
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control my-3"
          value={password}
          onChange={(e) => onChange(e)}
        />
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="form-control my-3"
          value={name}
          onChange={(e) => onChange(e)}
        />
        <button className="btn btn-success btn-block">Submit</button>
      </form>
      <Link to="/login">Login</Link> */}
    </Fragment>
  );
};

export default Register;
