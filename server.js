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

const departmentAdding = async () => {
    const department = await inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:'
        }
    ]);

    await runQuery('INSERT INTO departments (name) VALUES (?)', [department.name]);
    console.log(`Department "${department.name}" added successfully!`);
    mainPage();
};



const roleAdding = async () => {
    const departments = await runQuery('SELECT * FROM departments');
    // using map method to return a new selected department
    const departmentChoices = departments.map(department => ({
        // display the department names
        name: department.Name,
        // department.id is the value will be stored
        value: department.id
    }));

    const role = await inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:'
        },
        {
            type: 'list',
            // display the department name instead of deparment id
            name: 'departments_id',
            message: 'Select the department for this role:',
            choices: departmentChoices
        }
    ]);

    await runQuery('INSERT INTO roles (title, salary, departments_id) VALUES (?, ?, ?)', [role.title, role.salary, role.departments_id]);
    console.log(`Role "${role.title}" added successfully!`);
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