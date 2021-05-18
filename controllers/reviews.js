const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Case = require('../models/Case');

// @desc      Get reviews
// @route     GET /api/v1/reviews
// @route     GET /api/v1/cases/:caseId/reviews
// @access    Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.caseId) {
    const reviews = await Review.find({ case: req.params.caseId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single review
// @route     GET /api/v1/reviews/:id
// @access    Public
exports.getReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id).populate({
      path: 'case',
      select: 'name description'
    });
  
    if (!review) {
      return next(
        new ErrorResponse(`No review found with the id of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({
      success: true,
      data: review
    });
});
  
// @desc      Add review
// @route     POST /api/v1/cases/:caseId/reviews
// @access    Private
exports.addReview = asyncHandler(async (req, res, next) => {
    req.body.case = req.params.caseId;
    req.body.user = req.user.id;
  
    const cas = await Case.findById(req.params.caseId);
  
    if (!cas) {
      return next(
        new ErrorResponse(
          `No bootcamp with the id of ${req.params.caseId}`,
          404
        )
      );
    }
  
    const review = await Review.create(req.body);
  
    res.status(201).json({
      success: true,
      data: review
    });
});
 // i will have acces to vhange the role 
// @desc      Update review
// @route     PUT /api/v1/reviews/:id
// @access    Private
exports.updateReview = asyncHandler(async (req, res, next) => {
    let review = await Review.findById(req.params.id);
  
    if (!review) {
      return next(
        new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to update review`, 401));
    }
  
    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
  
    res.status(200).json({
      success: true,
      data: review
    });
});
  
// @desc      Delete review
// @route     DELETE /api/v1/reviews/:id
// @access    Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
    const review = await Review.findById(req.params.id);
  
    if (!review) {
      return next(
        new ErrorResponse(`No review with the id of ${req.params.id}`, 404)
      );
    }
  
    // Make sure review belongs to user or user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`Not authorized to update review`, 401));
    }
  
    await review.remove();
  
    res.status(200).json({
      success: true,
      data: {}
    });
  });