import React, { Fragment, useState } from 'react';

const InputTodo = ({ setTodosChange }) => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('token', localStorage.token);

      const body = { description };
      const response = await fetch('/api/dashboard/todos', {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      setTodosChange(true);
      setDescription('');
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <form className='d-flex mt-5' onSubmit={onSubmitForm}>
        <input
          type='text'
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Add new task'
          required
        />
        <button className='btn btn-success'>
          <i className='fa fa-plus' />
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
