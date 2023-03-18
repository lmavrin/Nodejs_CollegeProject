const express = require('express');
const router = express.Router();

const department = require('../business/department');

router.get('/', (req, res) => {
    res.json(department.get(req.query.company, req.query.dept_id));
});
router.put('/', (req, res) => {
    res.json(department.put(req.body));
});
router.post('/', (req, res) => {
    res.json(department.post(req.body));
});
router.delete('/', (req, res) => {
    res.json(department.delete(req.query.company,req.query.dept_id));
});

module.exports = router;