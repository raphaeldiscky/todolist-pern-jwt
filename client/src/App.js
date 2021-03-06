import React, { Fragment, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Landing from './components/layout/Landing';

toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        headers: { token: localStorage.token }
      });
      const parseRes = await response.json();
      // console.log(parseRes); //if jwt token is valid then true
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  // useEffect => run function that going to check if token is valid and continue to show dashboard if authenticated even after refresh
  useEffect(() => {
    isAuth();
  });

  return (
    <Fragment>
      <Router>
        <Switch>
          <Route
            exact
            path='/'
            render={(props) =>
              !isAuthenticated ? (
                <Landing {...props} />
              ) : (
                <Redirect to='/dashboard' />
              )
            }
          />
          <Route
            exact
            path='/login'
            render={(props) =>
              !isAuthenticated ? (
                <Login {...props} setAuth={setAuth} />
              ) : (
                <Redirect to='/dashboard' />
              )
            }
          />
          <Route
            exact
            path='/register'
            render={(props) =>
              !isAuthenticated ? (
                <Register {...props} setAuth={setAuth} />
              ) : (
                <Redirect to='/login' />
              )
            }
          />
          <div className='container'>
            <Route
              exact
              path='/dashboard'
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to='/login' />
                )
              }
            />
          </div>
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
