const Case = require('../models/Case');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');


// @desc      Get all Cases
// @route     Get /api/v1/cases
// @access    system Users
exports.getCases = asyncHandler (async (req, res, next) => {
    
    let query;

    //copy req.query
    let reqQuery = { ...req.query };

    //fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Loop over removeFields and delete them  from  reqQuery
    removeFields.forEach(params => delete reqQuery[params]);
    

    //create query string
    let queryStr = JSON.stringify(reqQuery);


    //create query like ($gt,gte and etc)
    queryStr = queryStr.replace(/\b(ge|gte|lt|lte|in)\b/g, match => `$${match}`);
    // console.log(queryStr);


    //finding resoucers
    query = Case.find(JSON.parse(queryStr));

    //select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort(' -createdAt ');
    }


    //pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Case.countDocuments();


    query = query.skip(startIndex).limit(limit);

   //Excuting query
    const cass = await query;

    //pagination results
    const pagination = {}
    
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }

    res
        .status(200)
        .json({ success: true, count: cass.length,pagination, data: cass });
    
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
        
});
