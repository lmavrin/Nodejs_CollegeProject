const express = require('express');
const router = express.Router();

const company = require('../business/company');

router.delete('/', (req, res) => {
    res.json(company.delete(req.query.company));
});

module.exports = router;