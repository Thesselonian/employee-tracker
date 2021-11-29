const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all role titles, id's, department role belongs to & salary
router.get('/roles', (req, res) => {
    const sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department 
                FROM roles 
                INNER JOIN departments ON roles.department_id = departments.id;
                `;

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