const Case = require('../models/Case');
const accusers = require('../models/Accuser')
const asyncHandler = require('../middleware/async');
const { query } = require('express');
const ErrorResponse = require('../utils/errorResponse');
const Accuser = require('../models/Accuser');

// @desc      Get Accusers
// @route     GET /api/v1/accusers
// @route     GET /api/v1/case/:caseId/accusers
// @access    not bublic
exports.getAccusers = asyncHandler(async (req, res, next) => {
    let query;

    if (req.params.caseId) {
        query = Accuser.find({ case: req.params.caseId });
    }
    else {
        query = Accuser.find().populate({
            path: 'case',
            select: 'name description'
        });
    }

    const arre = await query;

    res.status(200).json({
        success: true,
        count: arre.length,
        data: arre
    });

});

