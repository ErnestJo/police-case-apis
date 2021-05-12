const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },


    title: {
        type: String,
        required: [true, 'Please add a name'],
        enum: ['staff Sergeant', 'Sergeant', 'Corprola', 'ASP'],
    },
    
      email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      role: {
        type: String,
        enum: ['registra', 'osd', 'investigator'],
        default: 'police Officer'
      },
      password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
      createdAt: {
        type: Date,
        default: Date.now
      }

})

module.exports = mongoose.model('User', UserSchema);