// external imports
const express = require('express');
const { check } = require('express-validator');

// internal imports
const { getUsers } = require('../controller/userController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const avatarUpload = require('../middlewares/users/avatarUpload');

// router
const router = express.Router();

// users page
router.get('/', decorateHtmlResponse("Users"), getUsers);

// add user
router.post("/", avatarUpload, [
    check('name').not().isEmpty().withMessage('Name is required!'),
    check('email').isEmail().withMessage('Invalid email address!'),
    check('password').isLength({ min: 6 }).withMessage('Password must be 6 characters long!'),
], (req, res) => {
    res.send("Add user");
});

// export
module.exports = router;