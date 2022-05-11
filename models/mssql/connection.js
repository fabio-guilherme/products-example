/*
    On Sql Server Configuration Manager:

        - SQL Server Network Configuration -> Protocols for [SERVER] -> TCP/IP: 
            - Status = Enabled

        - SQL Server -> SQL Server Browser:
            - State = Running
*/

var mssql = require('mssql');

const sqlConfiguration = {
    server: 'localhost\\SQLEXPRESS',
    //port: 1433,
    database: 'Products',
    user: 'sa',
    password: 'password',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    "options": {
        "encrypt": false // Local server
            /*
            // For Azure
            encrypt: true,                  
            trustServerCertificate: false   // Change to true for local dev / self-signed certs
            */
    }
};

console.log("sqlConfiguration = " + JSON.stringify(sqlConfiguration));

const poolPromise = new mssql.ConnectionPool(sqlConfiguration)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL.');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
    mssql,
    poolPromise
}