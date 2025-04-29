// external imports
const express = require('express');

// internal imports
const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const {checkLogin} = require('../middlewares/common/checkLogin');

// router
const router = express.Router();

// inbox page
router.get('/', decorateHtmlResponse("Inbox"), checkLogin, getInbox);

// export
module.exports = router;