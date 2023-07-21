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
    console.log('Connected to the database.');
});


const runQuery = (sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = {
    runQuery
};