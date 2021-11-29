const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all employee id's, first & last names, roles, department, salaries and managers
router.get('/employees', (req, res) => {
    const sql = `SELECT e.id, 
                CONCAT(e.first_name, ', ', e.last_name) AS Employee_Name, 
                roles.title AS Position, roles.salary AS Salary, 
                departments.name AS Department,
                CONCAT(m.first_name, ', ', m.last_name) AS Manager_Name
                FROM employees e
                INNER JOIN roles ON e.role_id = roles.id 
                INNER JOIN departments ON e.department_id = departments.id
                LEFT JOIN employees m ON e.manager_id = m.id;`

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

module.exports = router;