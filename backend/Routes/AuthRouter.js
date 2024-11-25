const { signup, login, updateUserDetails} = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const ensureAuthenticated = require('../Middlewares/Auth'); // Import authentication middleware

const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/updateUserDetails', ensureAuthenticated, updateUserDetails); // Use ensureAuthenticated here



module.exports = router;
