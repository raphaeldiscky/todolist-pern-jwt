// connect server with db
const Pool = require('pg').Pool;
require('dotenv').config();

// const devConfig = {
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_DATABASE
// };

// const proConfig = {
//   connectionString: process.env.DATABASE_URL, // from heroku addons
//   ssl: true
// };

// const pool = new Pool(
//   process.env.NODE_ENV === 'production' ? proConfig : devConfig
// );

const devConfig = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === 'production' ? proConfig : devConfig
});

module.exports = pool;
