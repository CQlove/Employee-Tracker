const inquirer = require('inquirer');
const { welcome, runQuery } = require('./db/db');
const cTable = require('console.table');
const validateCheck = function (input) {
    if (input.trim() === '') {
        return 'This input cannot be empty, please re-enter again'
    } return true;
};
const validateCheckNumber = function (input) {
    const numberCheck = /^\d+(\.\d{1,2})?$/;
    if (!numberCheck.test(input)) {
        return 'Must be input a number and up to two decimal places, please enter again';
    }

    return true;
}

const showAllDepartments = async () => {
    const departments = await runQuery('SELECT * FROM departments');
    console.table(departments);
    mainPage();
};

// using selcet from & join way to get a new table
const showAllRoles = async () => {
    const roles = await runQuery(`SELECT roles.id,roles.title,roles.salary,departments.name AS department 
                                  FROM roles INNER JOIN departments on roles.departments_id = departments.id;`);
    console.table(roles);
    mainPage();
};

// using slecet from and left join this time because we need both left and right table
const showAllEmployees = async () => {
    const employees = await runQuery(`SELECT employees.id,employees.first_name,employees.last_name,roles.title AS title,departments.name AS department,roles.salary,  CONCAT(manager.first_name, ' ', manager.last_name) AS \`manager(fisrt-last name)\`
                                      FROM employees 
                                      LEFT JOIN roles on employees.role_id = roles.id 
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
            message: 'Enter the name of the new department:',
            validate: validateCheck,
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
            message: 'Enter the title of the new role:',
            validate: validateCheck,
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary for this role:',
            validate: validateCheckNumber,
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

// fetch id and name form employees table for employeeUpdate function
const getAllEmployees = async () => {
    const employees = await runQuery('SELECT id, CONCAT(first_name, " ", last_name) AS employee_name FROM employees');
    return employees;
};

// fetch id and title from roles table for employeeUpdate function
const getAllRoles = async () => {
    const roles = await runQuery('SELECT id, title FROM roles');
    return roles;
};

// same way as roleAdding() did before but we need more info from fetch
const employeeUpdate = async () => {
    const employees = await getAllEmployees();
    // using map method to return a selected employee
    const employeeChoices = employees.map(employee => ({
        // show name in prompt 
        name: employee.employee_name,
        // save by employee.id
        value: employee.id
    }));

    const roles = await getAllRoles();
    // using map method to return a selected employee
    const roleChoices = roles.map(role => ({
        // show role.title in prompt 
        name: role.title,
        // save by role.id
        value: role.id
    }));

    const updateEmployee = await inquirer.prompt([
        {
            type: 'list',
            name: 'employee_id',
            message: 'Select the employee you want to update:',
            choices: employeeChoices
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the new role for the employee:',
            choices: roleChoices
        }
    ]);

    await runQuery('UPDATE employees SET role_id = ? WHERE id = ?', [updateEmployee.role_id, updateEmployee.employee_id]);
    console.log('Employee role updated successfully!');
    mainPage();
}

const employeeAdding = async () => {
    const roles = await getAllRoles();
    const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id
    }));

    const managers = await getAllEmployees();
    const managerChoices = managers.map(manager => ({
        name: manager.employee_name,
        value: manager.id
    }));

    const employee = await inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter the first name of the new employee:',
            validate: validateCheck,
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter the last name of the new employee:',
            validate: validateCheck,
        },
        {
            type: 'list',
            name: 'role_id',
            message: 'Select the role for the new employee:',
            choices: roleChoices
        },
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select the manager for the new employee:',
            choices: [
                { name: 'None', value: null },
                ...managerChoices
            ]
        }
    ]);

    await runQuery('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [employee.first_name, employee.last_name, employee.role_id, employee.manager_id]);
    console.log(`Employee "${employee.first_name} ${employee.last_name}" added successfully!`);
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