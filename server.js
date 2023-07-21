const inquirer = require('inquirer');
const { welcome, runQuery } = require('./db');


const mainPage = async () => {

};

const opening = () => { welcome(); mainPage(); }
opening();