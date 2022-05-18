var pg = require('pg');

const connectionString = "postgres://wggbajyylhlltm:02bfee0d3f8e4a72070237e2132da59a2166196ff39d1b7f8b1f4ccb7fd48fae@ec2-3-248-121-12.eu-west-1.compute.amazonaws.com:5432/d2blnpac0dv643";
//const connectionString = "postgres://postgres:password@localhost:5432/Products";
//const connectionString = "postgres://" + process.env.DBUSER + ":" + process.env.DBPASS + "@localhost:5432/Products";
console.log("connectionString = " + connectionString);

const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10
        // For Heroku
        /*       ,
        ssl: {
            require: true,
            rejectUnauthorized: false
        */
}).on('connect', (stream) => {
    console.log('Connected to PG.');
});

module.exports = pool;