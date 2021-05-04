const Case = require('../models/Case');

// @desc      Get all Cases
// @route     Get /api/v1/cases
// @access    system Users
exports.getCases = async (req, res, next) => {
    
    try {
        const casess = await Case.find();

        res.status(200).json({
            success: true,
            data: casess,
            count: true
        })
    } catch (err) {
        res.status(400).json({
            success: false
        });
    }
    
};


// @desc      Get single Cases
// @route     Get /api/v1/cases/:id
// @access    system Users
exports.getCase = (req, res, next) => {
    res.status(200).json({ success: true, msg: `show case ${req.params.id}`});
}

// @desc      create Cases
// @route     Post /api/v1/cases
// @access    system Userscase
exports.createCase = async (req, res, next) => {
    try {
        const cases = await Case.create(req.body);

    res.status(201).json({
        success: true,
        data: cases
    });
    } catch (err) {
        res.status(400).json({
            success: false
        });
   }
};



// @desc      Update case
// @route     Update or put /api/v1/cases/:id
// @access    system Users
exports.updateCase = (req, res, next) => {
    res.status(200).json({ success: true, msg:`Update case ${req.params.id}` });
}

// @desc      delete case
// @route     delete case/api/v1/cases/:id
// @access    system Users
exports.deleteCase = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete case ${req.params.id}` });
}
