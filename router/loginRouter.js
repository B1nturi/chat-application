// external imports
const express = require('express');

// internal imports
const { getLogin, postLogin, logout } = require('../controller/loginController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { loginValidator, loginValidationHandler } = require('../middlewares/login/loginValidators');

// router
const router = express.Router();

// set page title
const pageTitle = "Login";

// login page
router.get('/', decorateHtmlResponse(pageTitle), getLogin);

// process login
router.post(
    '/',
    decorateHtmlResponse(pageTitle),
    loginValidator,
    loginValidationHandler,
    postLogin
);

// logout
router.delete('/', logout);

// export
module.exports = router;