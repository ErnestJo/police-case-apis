const express = require('express');
const { register,login , getMe, forgotPassword, resetPassword, updateDetails } = require('../controllers/auth');

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/updateDetails', protect, updateDetails)
router.post('/forgotPassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);


module.exports = router