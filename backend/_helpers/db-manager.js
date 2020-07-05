const sqlite3               = require('sqlite3').verbose();
const util                  = require('util');
const { json } = require('body-parser');
require('dotenv').config();

function getAll(table, orderby) {
    return new Promise(function (resolve, reject) {
        let db = new sqlite3.Database(process.env.SQLITEDBLOCATION);

        let sql = `SELECT * FROM ${table} `;

        if(orderby != null){
            sql+=` ORDER BY ${orderby}`
        }

        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err)
                return
            }
            let data = []
            rows.forEach((row) => {
                data.push(row);
            });
            resolve({status: true, message: "", data: data})
        });

        db.close();
    })
}

function insertOne(table, dataObject) {
    return new Promise(function (resolve, reject) {
        let db = new sqlite3.Database(process.env.SQLITEDBLOCATION);

        let tableNames = Object.keys(dataObject).join()

        let tableValuesArray = Object.values(dataObject)

        let numberOfValues = tableValuesArray.map((value) => '?').join(',');
        numberOfValues = `(${numberOfValues})`
        
        let sql = `INSERT INTO ${table}(${tableNames})
                    VALUES ${numberOfValues}`;

        db.run(sql, tableValuesArray, (err) => {
            if (err) {
                reject(err)
            }
            resolve({status: true, message: "OK", data: ""})
        });

        db.close();
    })
}

function get(table, whereConditions, resultCount) {
    return new Promise(function (resolve, reject) {
        let db = new sqlite3.Database(process.env.SQLITEDBLOCATION);

        let keysArray = Object.keys(whereConditions);
        let whereKeys = keysArray.map(
            (value) => `${value} = ?`
        ).join(' AND ');

        let whereValues = Object.values(whereConditions)

        let sql = `SELECT * FROM ${table}
                    WHERE ${whereKeys}`;
        
        if(resultCount == 1){
            db.get(sql, whereValues, (err, row) => {
                if (err) {
                    reject(err)
                }
                resolve({status: true, message: "OK", data: row ? row : null})
            });
        }else{
            db.all(sql, whereValues, (err, rows) => {
                if (err) {
                    reject(err)
                }
                resolve({status: true, message: "OK", data: rows})
            });
        }
        

        db.close();
    })
}


function update(table, whereConditions, dataObject) {
    return new Promise(function (resolve, reject) {
        let db = new sqlite3.Database(process.env.SQLITEDBLOCATION);
        
        // data
        let datakeysArray = Object.keys(dataObject);
        let dataKeys = datakeysArray.map(
            (value) => `${value} = ?`
        ).join(', ');
        let dataValues = Object.values(dataObject)


        // query
        let wherekeysArray = Object.keys(whereConditions);
        let whereKeys = wherekeysArray.map(
            (value) => `${value} = ?`
        ).join(' AND ');

        let whereValues = Object.values(whereConditions)


        let sql = `UPDATE ${table}
                    SET ${dataKeys}
                    WHERE ${whereKeys}`;
        let bothValues = dataValues.concat(whereValues)

        db.run(sql, bothValues, (err) => {
            if (err) {
                reject(err)
            }
            resolve({status: true, message: "OK", data: ""})
        });

        db.close();
    })
}

function deleteRow(table, whereConditions) {
    return new Promise(function (resolve, reject) {
        let db = new sqlite3.Database(process.env.SQLITEDBLOCATION);

        let keysArray = Object.keys(whereConditions);
        let whereKeys = keysArray.map(
            (value) => `${value} = ?`
        ).join(' AND ');

        let whereValues = Object.values(whereConditions)

        let sql = `DELETE FROM ${table}
                    WHERE ${whereKeys}`;

        db.run(sql, whereValues, (err) => {
            if (err) {
                reject(err)
            }
            resolve({status: true, message: "OK", data: ""})
        });

        db.close();
    })
}

module.exports = {
    getAll,
    insertOne,
    get,
    update,
    deleteRow
}