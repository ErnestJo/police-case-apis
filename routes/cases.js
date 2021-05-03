const express = require('express');
const router = express.Router();





router.get('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'show all cases' });
});




router.get('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `show cases ${req.params.id}`});
});




router.post('/', (req, res) => {
    res.status(200).json({ success: true, msg: 'Create a case' });
});



router.put('/:id', (req, res) => {
    res.status(200).json({ success: true, msg:`Update case ${req.params.id}` });
});



router.get('/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete case ${req.params.id}` });
});

module.exports = router;