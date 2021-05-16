const Case = require('../models/Case');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');


// @desc      Get all Cases
// @route     Get /api/v1/cases
// @access    system Users
exports.getCases = asyncHandler (async (req, res, next) => {
    
    res .status(200)
        .json(res.advancedResults);
    
});
    

// @desc      Get single Cases
// @route     Get /api/v1/cases/:id
// @access    system Users
exports.getCase = asyncHandler(async (req, res, next) => {
 
 const cas = await Case.findById(req.params.id);

        if (!cas) {
            return next(
                new ErrorResponse(`Case not found with id of ${req.params.id}`, 404)
            );
        }

    res.status(200).json({
        success: true,
        data: cas,
            
    });
    
   
});

// @desc      create Cases
// @route     Post /api/v1/cases
// @access    system Userscase
exports.createCase = asyncHandler(async (req, res, next) => {
   
    // Add user to res.body
    req.body.user = req.user.id;

    // Check for opening case

    const caseOpen = await Case.findOne({ user: req.user.id });

    const cases = await Case.create(req.body);

    res.status(201).json({
        success: true,
        data: cases
    });
   
});



// @desc      Update case
// @route     Update or put /api/v1/cases/:id
// @access    system Users
exports.updateCase = asyncHandler(async (req, res, next) => {

      
    const cas = await Case.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });


    if (!cas) {
        return next(
            new ErrorResponse(`Case not found with id of ${req.params.id}`, 404)
        );
    }

    
    res.status(201).json({
        success: true,
        data: cas
    }); 
     
 
});

// @desc      delete case
// @route     delete case/api/v1/cases/:id
// @access    system Users
exports.deleteCase = asyncHandler(async (req, res, next) => {
      
        const cas = await Case.findById(req.params.id);
    
    
        if (!cas) {
            return next(
                new ErrorResponse(`Case not found with id of ${req.params.id}`, 404)
            );
        }
    
    cas.remove();
    
        res.status(201).json({
            success: true,
            data: {}
        });
        
});
