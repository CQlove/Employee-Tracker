const inquirer = require('inquirer');
const { welcome, runQuery } = require('./db/db');
const cTable = require('console.table');

const showAllDepartments = async () => {
    const departments = await runQuery('SELECT * FROM departments');
    console.table(departments);
    mainPage();
};


const showAllRoles = async () => {
    const roles = await runQuery(`SELECT roles.id,roles.title,roles.salary,departments.name AS department 
                                  FROM roles INNER JOIN departments on roles.departments_id = departments.id;`);
    console.table(roles);
    mainPage();
};

const showAllEmployees = async () => {
    const employees = await runQuery(`SELECT employees.id,employees.first_name,employees.last_name,roles.title AS title,departments.name AS department,roles.salary,  CONCAT(manager.first_name, ' ', manager.last_name) AS \`manager(fisrt-last name)\`
                                      FROM employees LEFT JOIN roles on employees.role_id = roles.id 
                                      LEFT JOIN departments ON roles.departments_id = departments.id 
                                      LEFT JOIN employees manager on employees.manager_id= manager.id;`);
    console.table(employees);
    mainPage();
};


const mainPage = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ])

        .then((answers) => {
            const { choices } = answers;

            if (choices === "View all departments") {
                showAllDepartments();
            } else if (choices === "View all roles") {
                showAllRoles();
            } else if (choices === "View all employees") {
                showAllEmployees();
            } else if (choices === "Add a department") {
                departmentAdding();
            } else if (choices === "Add a role") {
                roleAdding();
            } else if (choices === 'Add an employee') {
                employeeAdding();
            } else if (choices === 'Update an employee role') {
                employeeUpdate();
            } else if (choices === 'Exit') {
                console.log('Exiting the Employee Track system.');
                connection.end();
            }
        });
};
const opening = () => { console.log("Welcome to Employee Track system!"); welcome(); mainPage(); }
opening();