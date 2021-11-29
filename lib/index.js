const fetch = require('node-fetch');
const cTable = require('console.table');

const getDepartments = () => {
    fetch('http://localhost:3001/api/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json()) 
    .then(departments => {
        console.table(departments.data)

    });
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
        for (i=0; i<employees.data.length; i++) {
            console.table([
                {id: employees.data[i].id}, 
                {name: employees.data[i].name}
            ]);
        };
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
        for (i=0; i<roles.data.length; i++) {
            console.table([
                {id: roles.data[i].id}, 
                {title: roles.data[i].title},
                {department_id: roles.data[i].department_id},
                {salary: roles.data[i].salary}
            ]);
        };
    });
};

module.exports = {getDepartments, getEmployees, getRoles};