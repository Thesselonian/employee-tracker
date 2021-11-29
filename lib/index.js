const fetch = require('node-fetch');
const promptDatabaseActions = require('../index');
const inquirer = require('inquirer')

const getDepartments = () => {
    fetch('http://localhost:3001/api/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json()) 
    .then(departments => {
        console.table(departments.data);
    })
    // .then(promptDatabaseActions());
};
const getEmployees = () => {
  fetch('http://localhost:3001/api/employees', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(employees => {
        console.table(employees.data);
    });
};


const getRoles = () => {
    fetch('http://localhost:3001/api/roles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json()) 
    .then(roles => {
            console.table(roles.data);
    });
};


const promptAddDepartment = () => {
    return inquirer.prompt(
        {
            type: 'input',
            name: 'departmentToAdd',
            Message: "Enter the name of the department you would like to add.",
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('Please enter a department name!');
                    return false;
                }
            }
        }
    )
    .then(data => {
        let departmentToAdd = {
            name: data.departmentToAdd
        } 
        fetch('http://localhost:3001/api/departments', {
            method: 'POST',
            body: JSON.stringify(departmentToAdd),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        });
    });
};

module.exports = {getDepartments, getEmployees, getRoles, promptAddDepartment};