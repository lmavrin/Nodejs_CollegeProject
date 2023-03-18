const express = require('express');
const router = express.Router();

const employees = require('../business/employees');

router.get('/', (req, res) => {
    res.json(employees.get(req.query.company));
});

module.exports = router;