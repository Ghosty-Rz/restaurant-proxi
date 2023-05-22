const Pool = require("pg").Pool;

const pool = new Pool({
    user: "zouitnir",
    password: "DATABASE2023",
    host: "localhost",
    port: 5432,
    database: "Proxi"
});

module.exports = pool;