const inquirer = require('inquirer');
const { welcome, runQuery } = require('./db');


const mainPage = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Update an employee role',
                'Exit'
            ]
        }
    ])

        .then((answers) => {
            const { choices } = answers;

            if (choices === "View all departments") {
                showAllDepartments();
            }

            if (choices === "View all roles") {
                showAllRoles();
            }

            if (choices === "View all employees") {
                showAllEmployees();
            }

            if (choices === "Add a department") {
                departmentAdding();
            }

            if (choices === "Add a role") {
                roleAdding();
            }

            if (choices === 'Add an employee') {
                employeeAdding();
            }

            if (choices === 'Update an employee role') {
                employeeUpdate();
            }
        });
}
const opening = () => { console.log("Welcome to Employee Track system!"); welcome(); mainPage(); }
opening();