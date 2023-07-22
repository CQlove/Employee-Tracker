const inquirer = require('inquirer');
const cTable = require('console.table');


const welcome = () => {
    console.log("***********************************");
    console.log("*                                 *");
    console.log("*        EMPLOYEE MANAGER         *");
    console.log("*                                 *");
    console.log("***********************************");
};


module.exports = {
    welcome,
};