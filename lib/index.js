const fetch = require('node-fetch');
const inquirer = require('inquirer');
const promptDatabaseActions = require('../index');

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
    getDepartments();
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
        //change roleDepartment from name to id
        for (i=0; i<departments.length; i++) {
            if (data.roleDepartment === departments[i].name) {
                data.roleDepartment = departments[i].id;
            }
        };
        //make object to use for body in fetch post
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
    getRoles();
};

//inquirer prompt for employee first name, last name, role, manager and department for the employee to be added
const promptAddEmployee = () => {
    let roleChoicesArray = [];
    let departmentChoicesArray = [];
    let employeeChoicesArray = [];
    //populate an array for all roles that exist in the database to be used in the inquirer prompt
    for (i=0; i<roles.length; i++) {
        roleChoicesArray.push(roles[i].title)
    };
    //populate an array for all departments that exist in the database to be used in the inquirer prompt
    for (i=0; i<departments.length; i++) {
        departmentChoicesArray.push(departments[i].name)
    };
    //populate an array for all employees that exist to be used in the manager prompt
    for (i=0; i<employees.length; i++) {
        employeeChoicesArray.push(employees[i].Employee_Name)
    };
    return inquirer.prompt([
        //employee first name
        {
            type: 'input',
            name: 'firstName',
            message: "Enter the first name of the employee.",
            validate: firstName => {
                if (firstName) {
                    return true;
                } else {
                    console.log('Please enter the first name of the employee!');
                    return false;
                }
            }
        },
        //employee last name
        {
            type: 'input',
            name: 'lastName',
            message: "Enter the last name of the employee.",
            validate: lastName => {
                if (lastName) {
                    return true;
                } else {
                    console.log('Please enter the last name of the employee!');
                    return false;
                }
            }
        },
        //role name
        {
            type: 'list',
            name: 'roleName',
            message: 'Select the role that this employee will have',
            choices: roleChoicesArray
        },
        //department name
        {
            type: 'list',
            name: 'managerName',
            message: 'Select the manager for this employee',
            choices: employeeChoicesArray
        },
        //department name
        {
            type: 'list',
            name: 'departmentName',
            message: 'Select the department that this employee will have',
            choices: departmentChoicesArray
        }
    ])
    //make post request to server to add employee to database
    .then(data => {
        //change roleName from a text name to id
        for (i=0; i<roles.length; i++) {
            if (data.roleName === roles[i].title) {
                data.roleName = roles[i].id;
            }
        };
        //change department name from text to id
        for (i=0; i<departments.length; i++) {
            if (data.departmentName === departments[i].name) {
                data.departmentName = departments[i].id;
            }
        };
        //change employee name from text to id
        for (i=0; i<employees.length; i++) {
            if (data.managerName === employees[i].Employee_Name) {
                data.managerName = employees[i].id;
            }
        };
        //make object to use for body in fetch post
        let employeeToAddObject = {
            first_name: data.firstName,
            last_name: data.lastName,
            role_id: data.roleName,
            manager_id: data.managerName,
            department_id: data.roleDepartment
        } 
        fetch('http://localhost:3001/api/employees', {
            method: 'POST',
            body: JSON.stringify(employeeToAddObject),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        });
    })
    .then(getEmployees());
};

const promptUpdateEmployeeRole = () => {
    let roleChoicesArray = [];
    let employeeChoicesArray = [];
    //populate an array containing all roles for inquirer selection of role to update to. 
    for (i=0; i<roles.length; i++) {
        roleChoicesArray.push(roles[i].title)
    };
    //populate an array containing all employees to use in inquirer prompt for selecting employee.
    for (i=0; i<employees.length; i++) {
        employeeChoicesArray.push(employees[i].Employee_Name)
    };
    return inquirer.prompt([
        //Select employee to update
        {
            type: 'list',
            name: 'employee',
            message: "Select the employee whose role you would like to update.",
            choices: employeeChoicesArray
        },
        //Role that the employee will be changed to
        {
            type: 'list',
            name: 'role',
            message: "Select the role that you would like to change the employee to.",
            choices: roleChoicesArray
        }
    ])
    //put request to update the employee role in the database
    .then(data => {
        //change roleName from a text name to id
        for (i=0; i<roles.length; i++) {
            if (data.role === roles[i].title) {
                data.role = roles[i].id;
            }
        };
        //change employee name from text to id
        for (i=0; i<employees.length; i++) {
            if (data.employee === employees[i].Employee_Name) {
                data.employee = employees[i].id;
            }
        };
        //make object to use for body in put request
        let employeeToUpdateObject = {
            role_id: data.role
        } 
        fetch(`http://localhost:3001/api/employees/${data.employee}`, {
            method: 'PUT',
            body: JSON.stringify(employeeToUpdateObject),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
        });
    })
    getEmployees();
}

departments = getDepartments();
employees = getEmployees();
roles = getRoles();

module.exports = {promptAddDepartment, promptAddRole, promptAddEmployee, displayEmployees, displayRoles, displayDepartments, promptUpdateEmployeeRole};