const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');



// @desc      Register User
// @route     Get /api/v1/auth/register
// @access    system User

exports.register = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true
    });
});