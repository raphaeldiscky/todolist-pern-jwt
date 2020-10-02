// check if token being given to server is valid

const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    // get token from header
    const jwtToken = req.header('token');
    if (!jwtToken) {
      return res.status(403).json('Authorization denied');
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    req.user = payload.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json('Token is not valid');
  }
};
