import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='jumbotron mt-5 text-center col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center '>
          <h1>Welcome to Todolist App!</h1>
          <p>Sign In and start building your todo list</p>
          <Link to='/login' className='btn btn-primary'>
            Login
          </Link>
          <Link to='/register' className='btn btn-primary ml-3'>
            Register
          </Link>
        </div>
        <footer class='mastfoot mt-auto text-center'>
          <div class='inner'>
            <p>
              Made for <a href='https://omahti.web.id//'>Oprec TI</a>, by{' '}
              <a href='https://github.com/raphaeldiscky'>@raphaeldiscky</a>.
            </p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default Landing;
