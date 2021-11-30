const fetch = require('node-fetch');
const promptDatabaseActions = require('../index');
const inquirer = require('inquirer')

let employees = [];
let roles = [];
let departments = [];

const getDepartments = () => {
    fetch('http://localhost:3001/api/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json()) 
    .then(response => {
        departments = response.data;
    })
};

const displayDepartments = () => {
    console.table(departments);
}

const getEmployees = () => {
  fetch('http://localhost:3001/api/employees', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(response => {
        employees = response.data;
    })
};

const displayEmployees = () => {
    console.table(employees);
};


const getRoles = () => {
    fetch('http://localhost:3001/api/roles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json()) 
    .then(response => {
            roles = response.data;
    });
};

const displayRoles = () => {
    console.table(roles);
}


const promptAddDepartment = () => {
    return inquirer.prompt(
        {
            type: 'input',
            name: 'departmentToAdd',
            message: "Enter the name of the department you would like to add.",
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
    //make post request to server to add department to database
    .then(data => {
        let departmentToAddObject = {
            name: data.departmentToAdd
        } 
        fetch('http://localhost:3001/api/departments', {
            method: 'POST',
            body: JSON.stringify(departmentToAddObject),
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

//inquirer prompt for name, salary and department for the role to be added
const promptAddRole = () => {
    let departmentsChoicesArray = []
    for (i=0; i<departments.length; i++) {
        departmentsChoicesArray.push(departments[i].name)
    }
    return inquirer.prompt([
        //role department
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Select the department that the role will belong to',
            choices: departmentsChoicesArray
        },
        //role name
        {
            type: 'input',
            name: 'roleName',
            message: "Enter the name of the role you would like to add.",
            validate: roleNameInput => {
                if (roleNameInput) {
                    return true;
                } else {
                    console.log('Please enter a name for the role!');
                    return false;
                }
            }
        },
        //role salary
        {
            type: 'input',
            name: 'roleSalary',
            message: "Enter the salary of the role you would like to add using only numbers with no commas.",
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('Please enter a salary for the role!');
                    return false;
                }
            }
        },
    ])
    //make post request to server to add role to database
    .then(data => {
        for (i=0; i<departments.length; i++) {
            if (data.roleDepartment === departments[i].name) {
                data.roleDepartment = departments[i].id;
            }
        };
        console.log(data);
        let roleToAddObject = {
            title: data.roleName,
            salary: data.roleSalary,
            department_id: data.roleDepartment
        } 
        fetch('http://localhost:3001/api/roles', {
            method: 'POST',
            body: JSON.stringify(roleToAddObject),
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

//inquirer prompt for employee first name, last name salary and department for the role to be added
const promptAddEmployee  = () => {
    return inquirer.prompt([
        //role department
        {
            type: 'input',
            name: 'roleDepartment',
            message: 'Enter the name of the department that this role will belong to',
            validate: departmentInput => {
                if (departmentInput) {
                    return true;
                } else {
                    console.log('Please enter a department for the role!');
                    return false;
                }
            }
        },
        //role name
        {
            type: 'input',
            name: 'roleName',
            message: "Enter the name of the role you would like to add.",
            validate: roleNameInput => {
                if (roleNameInput) {
                    return true;
                } else {
                    console.log('Please enter a name for the role!');
                    return false;
                }
            }
        },
        //role salary
        {
            type: 'input',
            name: 'roleToAdd',
            message: "Enter the salary of the role you would like to add using only numbers with no commas.",
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('Please enter a salary for the role!');
                    return false;
                }
            }
        },
    ])
    //make post request to server to add role to database
    .then(data => {
        console.log(data);
        let roleToAddObject = {
            name: data.roleToAdd
        } 
        fetch('http://localhost:3001/api/roles', {
            method: 'POST',
            body: JSON.stringify(roleToAddObject),
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

departments = getDepartments();
employees = getEmployees();
roles = getRoles();

module.exports = {promptAddDepartment, promptAddRole, displayEmployees, displayRoles, displayDepartments};