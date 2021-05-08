const mongoose = require('mongoose');


const accuserSchema = new mongoose.Schema({

  name: {
    type: String,
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
    required: [true, 'Please add Occupation of ']
  },
      
  nationalilty: {
    type: String,
    required: [true, 'Please add Nationality or tribe'],
  },
      
  description: {
    type: String,
    maxlength: [5000, 'Description can not be more than 5000 characters']
  },
   
  properties: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  
  case: {
    type: mongoose.Schema.ObjectId,
    ref: 'case',
    required: true,
  }

});

module.exports = mongoose.model('Accuser', accuserSchema);