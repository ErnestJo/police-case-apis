const express = require('express');
const router = express.Router();

router.get('/api/v1/cases', (req, res) => {
    res.status(200).json({ success: true, msg: 'show all cases' });
});