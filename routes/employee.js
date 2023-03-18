const express = require('express');
const router = express.Router();

const employee = require('../business/employee');

router.get('/', (req, res) => {
    res.json(employee.get(req.query.emp_id));
});
router.put('/', (req, res) => {
    res.json(employee.put(req.body));
});
router.post('/', (req, res) => {
    res.json(employee.post(req.body));
});
router.delete('/', (req, res) => {
    res.json(employee.delete(req.query.emp_id));
});

module.exports = router;