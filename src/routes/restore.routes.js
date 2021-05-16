const express = require('express');
const router = express.Router();
const restoreCtrl = require('../controllers/restore.controller');

router.delete('/',restoreCtrl.resetData);


module.exports = router;