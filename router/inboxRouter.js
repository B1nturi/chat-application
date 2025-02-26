// external imports
const express = require('express');
const router = express.Router();

// internal imports
const { getInbox } = require('../controller/inboxController');

// inbox page
router.get('/', getInbox);

// export
module.exports = router;