const sqlite3               = require('sqlite3').verbose();
const fsprom                = require('fs').promises;
const fs                    = require("fs");
require('dotenv').config();

if(process.env.DROP_DB_AT_RESTART == 0){
    return;
}

// Read the SQL file // Use trim() at the end to avoid errors
const droptables = fs.readFileSync('./database/droptables.sql', 'utf8').trim()
const createtables = fs.readFileSync('./database/createtables.sql', 'utf8').trim()
const initdata = fs.readFileSync('./database/initdata.sql', 'utf8').trim()
const dataSql = droptables + createtables + initdata;

// open the database
let db = new sqlite3.Database(process.env.SQLITEDBLOCATION, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    }
});

// Convert the SQL string to array so that you can run them one at a time.
// You can split the strings using the query delimiter i.e. `);` in // my case I used `;` .
const dataArr = dataSql.toString().split(";");

// db.serialize ensures that your queries are one after the other depending on which one came first in your `dataArr`
db.serialize(() => {
    // db.run runs your SQL query against the DB
    db.run("PRAGMA foreign_keys=OFF;"); //para evitar secuenciar las tablas
    db.run("BEGIN TRANSACTION;");
    
    // Loop through the `dataArr` and db.run each query
    dataArr.forEach(query => {
        if (query) {
            // Add the delimiter back to each query before you run them
            // In my case the it was `;`
            query += ";";
            db.run(query, err => {
                if (err) throw err;
            });
        }
    });
    db.run("PRAGMA foreign_keys = ON;");
    db.run("COMMIT;");
});

// Close the DB connection
db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Successful dropping and initialization! Database connection closed.');
});