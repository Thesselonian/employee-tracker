const fetch = require('node-fetch');
const promptDatabaseActions = require('../index');

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

module.exports = {getDepartments, getEmployees, getRoles};