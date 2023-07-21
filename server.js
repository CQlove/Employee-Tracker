const inquirer = require('inquirer');
const { welcome, runQuery } = require('./db/db');

const showAllDepartments = async () => {
    const departments = await runQuery('SELECT * FROM departments');
    console.table(departments);
    mainPage();
};


const showAllRoles = async () => {
    const roles = await runQuery('SELECT * FROM roles');
    console.table(roles);
    mainPage();
};

const showAllEmployees = async () => {
    const employees = await runQuery('SELECT * FROM employees');
    console.table(employees);
    mainPage();
};


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
            if (choices === 'Exit') {
                console.log('Exiting the Employee Track system.');
                connection.end();
            }
        });
};
const opening = () => { console.log("Welcome to Employee Track system!"); welcome(); mainPage(); }
opening();