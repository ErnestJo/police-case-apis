const advancedResults = (model, populate) => async (req, res, next) => {
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
    query = model.find(JSON.parse(queryStr));

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
    const total = await model.countDocuments();


    query = query.skip(startIndex).limit(limit);

    if (populate) {
        query = query.populate(populate);
        
    }

   //Excuting query
    const results = await query;

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

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }

    next();
};

module.exports = advancedResults;