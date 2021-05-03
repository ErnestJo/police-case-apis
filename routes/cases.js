const express = require('express');
const router = express.Router();

router.get('/api/v1/cases', (req, res) => {
    res.status(200).json({ success: true, msg: 'show all cases' });
});


router.get('/api/v1/cases/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `show cases ${req.params.id}`});
});


router.post('/api/v1/cases', (req, res) => {
    res.status(200).json({ success: true, msg: 'Create a case' });
});

router.put('/api/v1/cases/:id', (req, res) => {
    res.status(200).json({ success: true, msg:`Update case ${req.params.id}` });
});

router.get('/api/v1/cases/:id', (req, res) => {
    res.status(200).json({ success: true, msg: `Delete case ${req.params.id}` });
});