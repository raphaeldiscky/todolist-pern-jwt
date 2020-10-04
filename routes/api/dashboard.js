const router = require('express').Router();
const pool = require('../../db');
const authorize = require('../../middleware/authorize');

// @route   GET api/dashboard
// @desc    Get all todos and name from a user
// @access  private
router.get('/', authorize, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT u.user_name, t.todo_id, t.description FROM users AS u LEFT JOIN todos AS t ON u.user_id = t.user_id WHERE u.user_id = $1 ORDER BY todo_id',
      [req.user.id] // from jwtGenerator payload
    );

    res.json(user.rows); //get user data
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
});

// @route   POST api/dashboard/todos
// @desc    Create a todo
// @access  private
router.post('/todos', authorize, async (req, res) => {
  try {
    // get data from client side
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *',
      [req.user.id, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//@route  PUT api/dashboard/todos/:Id
//@desc   Update a todo
//@access private
router.put('/todos/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      'UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *',
      [description, id, req.user.id]
    );
    if (updateTodo.rows.length === 0) {
      return res.json('This todo is not yours');
    }
    res.json('Todo was updated');
  } catch (err) {
    console.error();
  }
});

//@route  DELETE api/dashboard/todos/:Id
//@desc   Delete a todo
//@access private
router.delete('/todos/:id', authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      'DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );
    if (deleteTodo.rows.length === 0) {
      return res.json('This todo is not yours');
    }
    res.json('Todo was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
