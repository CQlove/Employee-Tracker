const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASS,
    database: 'employee_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Success to connect to the database!');
});

const welcome = () => {
    console.log("***********************************");
    console.log("*                                 *");
    console.log("*        EMPLOYEE MANAGER         *");
    console.log("*                                 *");
    console.log("***********************************");
};

const runQuery = (sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    welcome,
    runQuery
};