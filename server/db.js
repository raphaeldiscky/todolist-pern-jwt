// connect server with db
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "19236",
    host: "localhost",
    port: 5432,
    database: "jwtauth"
});