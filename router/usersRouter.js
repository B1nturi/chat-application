// external imports
const express = require('express');

// internal imports
const { getUsers } = require('../controller/userController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// router
const router = express.Router();

// users page
router.get('/', decorateHtmlResponse("Users"), getUsers);

// export
module.exports = router;