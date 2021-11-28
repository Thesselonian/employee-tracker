const inquirer = require('inquirer');

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
            ]
        }
    )
    //based on response from user the appropriate set of questions for the employee typed are returned
    .then(promptResponse => {
        switch (promptResponse.databaseAction) {
            case 'View all departments.':
                console.log('line 26');
                break;
        }
        // if(typeOfEmployee.addEmployeeType === 'engineer') {
        //    return promptEngineerQuestions(employees);
        // } else if(typeOfEmployee.addEmployeeType === 'intern') {
        //    return promptInternQuestions(employees);
        // } else {
        //   return employees
        // }
    })

}

promptDatabaseActions();