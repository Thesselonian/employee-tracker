const getDepartments = () => {
    fetch('/api/departments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json()) 
    .then(departments => console.log(departments));
};

const getEmployees = () => {
    fetch('/api/employees', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json()) 
    .then(employees => console.log(employees));
};

const getRoles = () => {
    fetch('/api/roles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json()) 
    .then(roles => console.log(roles));
};

module.exports = {getDepartments, getEmployees, getRoles};