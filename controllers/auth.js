const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');



// @desc      Register User
// @route     Get /api/v1/auth/register
// @access    system User

exports.register = asyncHandler(async (req, res, next) => {
    const {name, email, title, role, password } = req.body;

    // create user

    const user = await User.create({
        name,
        email,
        title,
        role,
        password
    });
 res.status(200).json({ success: true})


});