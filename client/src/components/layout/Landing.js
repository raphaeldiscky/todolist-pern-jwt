import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Fragment>
      <div className='container-fluid  col-lg-9'>
        <div className='jumbotron mt-2 text-center col-lg-6 col-md-6 col-sm-6 col-xs-6 offset-3 float-md-center '>
          <h1>Todolist App</h1>
          <p>Sign in and start building your todo list</p>
          <div className='embed-responsive embed-responsive-4by3'>
            <iframe
              title='spongebob todolist'
              src='https://www.youtube.com/embed/HwwGPOhF4CI?autoplay=1'
              className='embed-responsive-item'
              allow='autoplay'
              allowFullScreen
            ></iframe>
          </div>
          <Link
            to='/register'
            className='btn btn-primary ml-3 rounded-pill mt-5 font-link'
          >
            JOIN NOW
          </Link>
        </div>

        <footer class='mastfoot mt-auto text-center'>
          <div class='inner'>
            <p>
              Made for{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://omahti.web.id//'
              >
                Oprec TI
              </a>
              , by{' '}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://github.com/raphaeldiscky'
              >
                @raphaeldiscky
              </a>
              .
            </p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default Landing;
