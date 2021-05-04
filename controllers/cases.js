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
exports.getCase =  async  (req, res, next) => {

    try {
        const cas = await Case.findById(req.params.id);

        if (!cas) {
           return res.status(400).json({ success: false });
        }

        res.status(200).json({
            success: true,
            data: cas,
            
        })
    } catch (err) {
        res.status(400).json({
            success: false
        });
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
        res.status(400).json({
            success: false
        });
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
        return res.status(400).json({ success: false });
    }

    
    res.status(201).json({
        success: true,
        data: cas
    }); 
     
  } catch (err) {
    res.status(400).json({
        success: false
    });
  }
};

// @desc      delete case
// @route     delete case/api/v1/cases/:id
// @access    system Users
exports.deleteCase = async (req, res, next) => {

    try {
      
        const cas = await Case.findByIdAndDelete(req.params.id);
    
    
        if (!cas) {
            return res.status(400).json({ success: false });
        }
    
        res.status(201).json({
            success: true,
            data: {}
        });
        
      } catch (err) {
        res.status(400).json({
            success: false
        });
      } 
}
