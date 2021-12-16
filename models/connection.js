var pg = require('pg');

const connectionString = "postgres://postgres:password@localhost:5432/Products"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10
        /*
        ,
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        */
})

module.exports = pool;