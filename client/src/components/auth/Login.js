import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'; // Link => guide us back to register route
import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const parseRes = await response.json();
      // console.log(parseRes);
      // parseRes is object

      if (parseRes.token) {
        localStorage.setItem('token', parseRes.token);
        setAuth(true);
        toast.success('Login Successfully');
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
      <div className='container-fluid'>
        <div className='row no-gutter'>
          <div className='d-none d-md-flex col-md-4 col-lg-6 bg-image'></div>
          <div className='col-md-8 col-lg-6'>
            <div className='login d-flex align-items-center py-5'>
              <button className='btn'>
                <Link className='home-btn fa fa-home fa-lg' to='/'></Link>
              </button>
              <div className='container'>
                <div className='row'>
                  <div className='col-md-9 col-lg-8 mx-auto'>
                    <h3 className='login-heading mb-4 text-center'>
                      Welcome back!
                    </h3>
                    <form onSubmit={onSubmitForm}>
                      <div className='form-label-group'>
                        <input
                          type='email'
                          name='email'
                          id='inputEmail'
                          className='form-control'
                          placeholder='Email address'
                          value={email}
                          onChange={(e) => onChange(e)}
                          required
                          autoFocus
                        />
                        <label htmlFor='inputEmail'>Email address</label>
                      </div>

                      <div className='form-label-group'>
                        <input
                          type='password'
                          name='password'
                          id='inputPassword'
                          className='form-control'
                          placeholder='Password'
                          value={password}
                          onChange={(e) => onChange(e)}
                          required
                        />
                        <label htmlFor='inputPassword'>Password</label>
                      </div>
                      <button
                        className='btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 font-link'
                        type='submit'
                      >
                        Login
                      </button>
                      <div className='text-center'>
                        <Link className='small' to='/register'>
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
    </Fragment>
  );
};

export default Login;
