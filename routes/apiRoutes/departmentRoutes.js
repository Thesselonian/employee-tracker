const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// Get all department id's and names
router.get('/departments', (req, res) => {
    const sql = `SELECT * FROM departments`;

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

//Add a department
router.post('/departments', ({ body }, res) => {
    const sql = `INSERT INTO departments (id, name) VALUES(?,?)`;
    const params = [body.id, body.name];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body,
            changes: result.affectedRows
        });
    });
});

module.exports = router;