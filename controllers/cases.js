const Case = require('../models/Case');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all Cases
// @route     Get /api/v1/cases
// @access    system Users
exports.getCases = async (req, res, next) => {
    
    try {
        const casess = await Case.find();

        res.status(200).json({
            success: true,
            count: casess.length,
            data: casess
            
        })
    } catch (err) {
        next(err);
    }
    
};


// @desc      Get single Cases
// @route     Get /api/v1/cases/:id
// @access    system Users
exports.getCase =  async  (req, res, next) => {

    try {
        const cas = await Case.findById(req.params.id);

        if (!cas) {
            return next(
                new ErrorResponse(`Case not found with id of ${req.params.id}`, 404)
            );
        }

        res.status(200).json({
            success: true,
            data: cas,
            
        })
    } catch (err) {
        next(err);
    }
   
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
        next(err);
   }
};



// @desc      Update case
// @route     Update or put /api/v1/cases/:id
// @access    system Users
exports.updateCase = async (req, res, next) => {
  try {
      
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
     
  } catch (err) {
    next(err);
  }
};

// @desc      delete case
// @route     delete case/api/v1/cases/:id
// @access    system Users
exports.deleteCase = async (req, res, next) => {

    try {
      
        const cas = await Case.findByIdAndDelete(req.params.id);
    
    
        if (!cas) {
            return next(
                new ErrorResponse(`Case not found with id of ${req.params.id}`, 404)
            );
        }
    
        res.status(201).json({
            success: true,
            data: {}
        });
        
      } catch (err) {
        next(err);
      } 
}
