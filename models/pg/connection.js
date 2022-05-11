var pg = require('pg');

//const connectionString = "postgres://frqlcxbdpnqpbx:6490e71efb2582596c194121df35398e720d9dd0db63a21b23675f58e08dbb66@ec2-99-80-170-190.eu-west-1.compute.amazonaws.com:5432/d3u6q577hiruhf"
const connectionString = "postgres://postgres:password@localhost:5432/Products"
    //const connectionString = "postgres://" + process.env.DBUSER + ":" + process.env.DBPASS + "@localhost:5432/Products"
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