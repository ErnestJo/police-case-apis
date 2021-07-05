const mongoose = require('mongoose');
const { format } = require('morgan');
const slugify = require('slugify');
const Accuser = require('./Accuser');




const CaseSchema = new mongoose.Schema({

  caseNumber: {
    type: String,
  },

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
 
  
  isAssigned: {
    type: Boolean,
    default: false
  },

  assignTo: {
    type: String,
  },

  status: {
    type: String,
    default: 'Waiting',
    enum: [
      'Waiting',
      'Closed',
      'Active',
      'OnCourt',
    ]
    
  },
  
  finalDisposal: {
    type:String
    },
  
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
  },
    {
      toJSON: { virtuals: true }, 
      toObject:{ virtuals: true }
});

    // create a slug for slug name
 CaseSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
 });

// count number case and create ir
CaseSchema.pre('save', async function (next) {
  console.log()
  const countCase = parseInt((await mongoose.model('case', CaseSchema).find()).length) + 1;
  this.caseNumber = 'rb/' + countCase;
  next()
});
mongoose.model('case', CaseSchema);



// Cascade delete 
CaseSchema.pre('remove', async function (next) {
  await this.model('Accuser').deleteMany({ case: this._id });
  next();
});

// Cascade delete 
CaseSchema.pre('remove', async function (next) {
  await this.model('InvestigationReports').deleteMany({ case: this._id });
  next();
});

// Reverse populate with vituals accusers
CaseSchema.virtual('accusers', {
  ref: 'Accuser',
  localField: '_id',
  foreignField: 'case',
  justOne: false
});

// Reverse populate with vituals ir
CaseSchema.virtual('investigationReports', {
  ref: 'InvestigationReports',
  localField: '_id',
  foreignField: 'case',
  justOne: false
});



module.exports = mongoose.model('case', CaseSchema);

 