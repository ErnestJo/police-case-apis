const express = require('express');
const { getCases,
    getCase,
    createCase,
    updateCase,
    deleteCase } = require('../controllers/cases');

const router = express.Router();

router.route('/')
     .get(getCases)
     .post(createCase);
     
router
    .route('/:id')
    .get(getCase)
    .put(updateCase)
    .delete(deleteCase)

module.exports = router;