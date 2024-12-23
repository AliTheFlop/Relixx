const { Pool } = require("pg");
require("dotenv").config();

const PGPASS = process.env.PGPASS;

const client = new Pool({
    user: "postgres",
    password: PGPASS,
    database: "Septims",
    host: "localhost",
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
});

module.exports = client;
