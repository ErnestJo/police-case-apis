const mongoose = require("mongoose");

const investigationReportSchema = new mongoose.Schema({

    irNumber: {
        type: String,
      },

    propertyStolen: {
        type: Boolean,
        default: false
    },

    ifStolenproperty: {
        type: String,     
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
    },
    remarks: {
        type: String,
        maxlength: [5000, 'Description can not be more than 5000 characters']
    },
    court: {
        type: Boolean,
        default: false
    },


    description: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters']
    },
     
    case: {
        type: mongoose.Schema.ObjectId,
        ref: 'case',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      },
    

});

investigationReportSchema.pre('save', async function (next) {
    console.log()
    const countir = parseInt((await mongoose.model('investigatonReport', investigationReportSchema).find()).length) +1;
    this.irNumber = 'IR/'+countir;
    next()
});
mongoose.model('investigatonReport', investigationReportSchema)

module.exports = mongoose.model('InvestigationReport', investigationReportSchema);