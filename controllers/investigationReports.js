const Case = require('../models/Case');
const accusers = require('../models/Accuser')
const asyncHandler = require('../middleware/async');
const { query } = require('express');
const ErrorResponse = require('../utils/errorResponse');
const advancedResults = require('../middleware/advancedResults');



// @desc      Get IR
// @route     GET /api/v1/investigationReports
// @route     GET /api/v1/case/:caseId/investigationReports
// @access    not bublic
exports.getIrs = asyncHandler(async (req, res, next) => {
    

    if (req.params.caseId) {
        const ireports =  await InvestigationReport.find({ case: req.params.caseId });
    
    
        res.status(200).json({
            success: true,
            count: ireports.length,
            data: ireports
        });
    } else {
        res.status(200).json(res.advancedResults);
    }

});


// @desc      Get Ir
// @route     GET /api/v1/investigationReports/:id
// @access    not public
exports.getIr = asyncHandler(async (req, res, next) => {
    const ireport = await InvestigationReport.findById(req.params.id).populate({
         path: 'case',
         select: 'name description'
   })

    if (!ireport) {
        return next(new ErrorResponse(`No Investigation Report with such ${req.params.id}`), 404);
    }

    res.status(200).json({
        success: true,
        data: ireport
    });

});



// @desc      add  Ir
// @route     POST /api/v1/case/:caseId/investigationReports
// @access    not public
exports.addIr = asyncHandler(async (req, res, next) => {
    req.body.case = req.params.caseId;

    const cas = await Case.findById(req.params.caseId)

    if (!cas) {
        return next(new ErrorResponse(`No Case with such id of ${req.params.caseId}`), 404);
    }

    const ireport = await InvestigationReport.create(req.body);
    
        res.status(200).json({
        success: true,
        data: ireport
    });

});



// @desc      Upadte   Ir
// @route     PUT /api/v1/investigationReports/:id 
// @access    not public
exports.UpdateIr = asyncHandler(async (req, res, next) => {

    let ireport = await InvestigationReport.findById(req.params.id)

    if (!ireport) {
        return next(new ErrorResponse(`No Investigation Report with such id of ${req.params.caseId}`), 404);
    }

    ireport = await InvestigationReport.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators:true
     });
    

    res.status(200).json({
        success: true,
        data: ireport
    });

});


// @desc      Delete   Ir
// @route     DELETE /api/v1/investigationReports/:id 
// @access    not public
exports.deleteIr = asyncHandler(async (req, res, next) => {

    const ireport = await InvestigationReport.findById(req.params.id)

    if (!ireport) {
        return next(new ErrorResponse(`No Investigation Report with such id of ${req.params.caseId}`), 404);
    }

    await ireport.remove();
    


    res.status(200).json({
        success: true,
        data: {}
    });

});
