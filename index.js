const inquirer = require('inquirer');
const {promptAddDepartment, promptAddRole, displayEmployees, displayDepartments, displayRoles } = require('./lib/index');

//prompt for how the user would like to interact with the employee tracker database
const promptDatabaseActions = () => {
    return inquirer.prompt(
        {
            type: 'list',
            name: 'databaseAction',
            Message: 'What would you like to do?',
            choices: [
                'View all departments.',
                'View all roles.',
                'View all employees.',
                'Add a department.',
                'Add a role.',
                'Add an employee.',
                'Update an employee role.',
                'Quit'
            ]
        }
    )
    //based on response from user the appropriate set of questions for the employee typed are returned
    .then(promptResponse => {
        switch (promptResponse.databaseAction) {
            case 'View all departments.':
                displayDepartments();
                break;
            case 'View all roles.':
                displayRoles();
                break;
            case 'View all employees.':
                displayEmployees();
                break;
            case 'Add a department.':
                promptAddDepartment();
                break;
            case 'Add a role.':
                promptAddRole()
                break;
            case 'Add an employee.':
                console.log('line 26');
                break;
            case 'Update an employee role.':
                console.log('line 26');
                break;
        }
    })
}

promptDatabaseActions();


module.exports = promptDatabaseActions;