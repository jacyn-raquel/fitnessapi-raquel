const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users.js');
const {verify} = require('../auth.js')

// 1) Register
router.post('/register', userControllers.registerUser);

// 2) Login
router.post('/login', userControllers.loginUser);

// 3) Get User Details
router.get('/details', verify, userControllers.retrieveUserDetails);

module.exports = router;