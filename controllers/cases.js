
// @desc      Get all Cases
// @route     Get /api/v1/cases
// @access    system Users
exports.getCases = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'show all cases' });
}


// @desc      Get single Cases
// @route     Get /api/v1/cases/:id
// @access    system Users
exports.getCase = (req, res, next) => {
    res.status(200).json({ success: true, msg: `show case ${req.params.id}`});
}

// @desc      create Cases
// @route     Post /api/v1/cases
// @access    system Users
exports.createCase = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create a case' });
}



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
