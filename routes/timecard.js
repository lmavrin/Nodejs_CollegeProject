const express = require('express');
const router = express.Router();

const timecard = require('../business/timecard');

router.get('/', (req, res) => {
    res.json(timecard.get(req.query.timecard_id));
});
router.put('/', (req, res) => {
    res.json(timecard.put(req.body));
});
router.post('/', (req, res) => {
    res.json(timecard.post(req.body));
});
router.delete('/', (req, res) => {
    res.json(timecard.delete(req.query.timecard_id));
});

module.exports = router;