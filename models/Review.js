const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title for the review'],
    maxlength: 100
  },
  text: {
    type: String,
    required: [true, 'Please add some text']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Please add a rating between 1 and 10']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  case: {
    type: mongoose.Schema.ObjectId,
    ref: 'case',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

// Prevent user from submitting more than one review per bootcamp
ReviewSchema.index({ bootcamp: 1, user: 1 }, { unique: true });

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function(caseId) {
  const obj = await this.aggregate([
    {
      $match: { case: caseId }
    },
    {
      $group: {
        _id: '$case',
        averageRating: { $avg: '$rating' }
      }
    }
  ]);

  try {
    await this.model('Case').findByIdAndUpdate(caseId, {
      averageRating: obj[0].averageRating
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
ReviewSchema.post('save', function() {
  this.constructor.getAverageRating(this.case);
});

// Call getAverageCost before remove
ReviewSchema.pre('remove', function() {
  this.constructor.getAverageRating(this.case);
});

module.exports = mongoose.model('Review', ReviewSchema);