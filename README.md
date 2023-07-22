# Employee-Tracker

## Table of Contents

- [User-story](#user-story)
- [Acceptance-Criteria](#acceptance-criteria)
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)

## User-story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Description

This Employee Tracker mainly uses Node.js, Inquirer, and MySQL to build a command-line application to manage a company's employee database.

## Installation

Before you start to run the application, you need to update your MySQL password in bd.js line 8(change password: process.env.DB_PASS, to password:"xxxx"; xxxx is your own password)!

Next you need to open your terminal in the root to install the npm packages and type:

```bash
>npm i console.table dotenv inquirer@^8.2.4 mysql2
```

Once you installed packages, you need to open your terminal in db folder run mySQL by type:

```bash
>mysql -u root -p
```

Then run the schema.sql by type:

```bash
>source schema.sql
```

Then run seeds.sql to insert some data by type:

```bash
>source seeds.sql
```

Next, you need go back to root and open terminal and type:

```bash
>node server.js
```

Now, you can run the application!

## Usage

To use the application, you need to follow the installation part to open the application. Then use arrow key to select whatever section you want. By hitting enter to execute the section you want, the application may ask you some questions, you just need to follow the step to run the application.



https://github.com/CQlove/Employee-Tracker/assets/128104973/7a243e94-0903-4d81-8710-e95f23228608


