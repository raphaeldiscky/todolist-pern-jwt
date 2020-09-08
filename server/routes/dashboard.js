const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    // req.user has a payload
    // res.json(req.user); //get an id: user_id

    const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [
      req.user.id,
    ]);

    res.json(user.rows[0]); //get user data 
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
