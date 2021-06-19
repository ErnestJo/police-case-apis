const Case = require('../models/Case');
const Accuser = require('../models/Accuser')
const asyncHandler = require('../middleware/async');
const { query } = require('express');
const ErrorResponse = require('../utils/errorResponse');
const advancedResults = require('../middleware/advancedResults');

// @desc      Get Accusers
// @route     GET /api/v1/accusers
// @route     GET /api/v1/case/:caseId/accusers
// @access    not bublic
exports.getAccusers = asyncHandler(async (req, res, next) => {
    

    if (req.params.caseId) {
        const accusers =  await Accuser.find({ case: req.params.caseId });
    
    
        res.status(200).json({
            success: true,
            count: accusers.length,
            data: accusers
        });
    } else {
        res.status(200).json(res.advancedResults);
    }

});


// @desc      Get Accuser
// @route     GET /api/v1/accusers/:id
// @route     GET /api/v1/case/:caseId/accusers
// @access    not public
exports.getAccuser = asyncHandler(async (req, res, next) => {
    const accuser = await Accuser.findById(req.params.id).populate({
         path: 'case',
         select: 'name description'
   })

    if (!accuser) {
        return next(new ErrorResponse(`No Accuser with such ${req.params.id}`), 404);
    }

    res.status(200).json({
        success: true,
        data: accuser
    });

});



// @desc      add  Accuser
// @route     POST /api/v1/case/:caseId/accusers
// @access    not public
exports.addAccuser = asyncHandler(async (req, res, next) => {

    // Add user to req,body
    req.body.user = req.user.id;
    
    req.body.case = req.params.caseId;

    const cas = await Case.findById(req.params.caseId)

    if (!cas) {
        return next(new ErrorResponse(`No Case with such id of ${req.params.caseId}`), 404);
    }

    const accuser = await Accuser.create(req.body);
    

    res.status(200).json({
        success: true,
        data: accuser
    });

});



// @desc      Upadte   Accuser
// @route     PUT /api/v1/accusers/:id 
// @access    not public
exports.UpdateAccuser = asyncHandler(async (req, res, next) => {

    let accuser = await Accuser.findById(req.params.id)

    if (!accuser) {
        return next(new ErrorResponse(`No Accuser with such id of ${req.params.caseId}`), 404);
    }

    accuser = await Accuser.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators:true
     });
    


    res.status(200).json({
        success: true,
        data: accuser
    });

});


// @desc      Delete   Accuser
// @route     DELETE /api/v1/accusers/:id 
// @access    not public
exports.deleteAccuser = asyncHandler(async (req, res, next) => {

    const accuser = await Accuser.findById(req.params.id)

    if (!accuser) {
        return next(new ErrorResponse(`No Accuser with such id of ${req.params.caseId}`), 404);
    }

    await accuser.remove();
    


    res.status(200).json({
        success: true,
        data: {}
    });

});
