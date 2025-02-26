// external imports
const express = require('express');
const router = express.Router();

// internal imports
const { getUsers } = require('../controller/userController');

// users page
router.get('/', getUsers);

// export
module.exports = router;