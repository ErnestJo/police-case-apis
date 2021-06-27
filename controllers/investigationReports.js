const Case = require('../models/Case');
const path = require('path');
const InvestigationReport = require('../models/InvestigationReport');
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

    // Add user to req,body


    //  req.body.user = req.user.id;
    
    if (req.params.caseId) {

        const ireportss =  await InvestigationReport.find({ case: req.params.caseId });
        
        res.status(200).json({
            success: true,
            count: ireportss.length,
            data: ireportss
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

    // Add user to req,body
    req.body.user = req.user.id;

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



// @desc      add photo    Ir
// @route     PUT /api/v1/investigationReports/:id/photo
// @access    not public
exports.irPhotoUpload = asyncHandler(async (req, res, next) => {

    const ireport = await InvestigationReport.findById(req.params.id)

    if (!ireport) {
        return next(new ErrorResponse(`No Investigation Report with such id of ${req.params.caseId}`), 404);
    }

    if (!req.files) {
        return next(
            new ErrorResponse(`Please Upload a file`, 404)
        )
    }
    
      const file = req.files.file;
    
      // Make sure the image is a photo
      if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
      }
    
      // Check filesize
      if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
          new ErrorResponse(
            `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
            400
          )
        );
      }
    
   
      file.name = `photo_${ireport._id}${path.parse(file.name).ext}`;
    
    console.log(file.name)
      file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
          console.error(err);
          return next(new ErrorResponse(`Problem with file upload`, 500));
        }
    
        await InvestigationReport.findByIdAndUpdate(req.params.id, { photo: file.name });
    
        res.status(200).json({
          success: true,
          data: file.name
        });
      });
});
