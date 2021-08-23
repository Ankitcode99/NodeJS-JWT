const express = require('express');
const router = express.Router();
const {requiredAuth, ensureGuest} = require('../middleware/authmiddleware');
const authController = require('../controllers/authController')

router.get('/signup', ensureGuest, authController.signup_get)

router.post('/signup', ensureGuest, authController.signup_post)

router.get('/login', ensureGuest, authController.login_get)

router.post('/login',ensureGuest, authController.login_post)

router.get('/logout',requiredAuth,authController.logout_get);
 
module.exports = router;