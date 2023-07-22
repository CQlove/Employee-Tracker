const inquirer = require('inquirer');
const { welcome } = require('./db/ui');
const { mainPage } = require('./db/logic')

const opening = () => { console.log("Welcome to Employee Track system!"); welcome(); mainPage(); }
opening();