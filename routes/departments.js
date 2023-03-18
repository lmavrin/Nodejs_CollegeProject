const express = require('express');
const router = express.Router();

const departments = require('../business/departments');

router.get('/', (req, res) => {
    res.json(departments.get(req.query.company));
});

module.exports = router;