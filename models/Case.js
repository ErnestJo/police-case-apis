const mongoose = require('mongoose');
const slugify = required('slugify');

  const CaseSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },

  age: Number,

  phone: {
    type: String,
    maxlength: [20, 'Phone number can not be longer than 20 characters']
  },

  gender: {
    type: String,
    required: [true, 'Please add a Gender'],
  },

  occupation: {
    type: String,
    required:[true , 'Please add Occupation of ']
  },
  
  nationalilty: {
    type: String,
    required: [true, 'Please add Nationality or tribe'],
  },

  slug: String,

  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters']
  },

  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  immeadteAction: {
    type: String,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  
    arrested: {
        type: Boolean,
        default: false
  },
  policeOfficeTakingIntialAction: {
    type: String
  },
   
  
  finalDisposal: {
    type:String
  },
  });



    // create a slug for slug name
CaseSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('case', CaseSchema);

 