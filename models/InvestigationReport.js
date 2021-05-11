const mongoose = require("mongoose");

const investigationReportSchema = new mongoose.Schema({
    remarks: {
        type: String,
        maxlength: [5000, 'Description can not be more than 5000 characters']
    },
    
    court: {
        type: String
    },

    propertyStolen: {
        type: Boolean,
        default: false
    },

    ifStolenproperty: {
        type: String,
        
    },

    investigationOfficer: {
        type: String,
        require: [true, 'Please add this field must be kujazwa']
    },

    categoryOfOffence: {
        type: String,
        require: [true, 'Please add category of offence']
    },
    
    offence: {
        type: String,
   
    },

    section: {
        type: String,
               
    },

    chapter: {
        type: String,
    
    },
    
    photo: {
        type: String,
        default: 'no-photo.jpg'
      },

    case: {
        type: mongoose.Schema.ObjectId,
        ref: 'case',
        required: true,
      }

});


module.exports = mongoose.model('InvestigationReport', investigationReportSchema);