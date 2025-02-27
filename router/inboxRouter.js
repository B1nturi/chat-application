// external imports
const express = require('express');

// internal imports
const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

// router
const router = express.Router();

// inbox page
router.get('/', decorateHtmlResponse("Inbox"), getInbox);

// export
module.exports = router;