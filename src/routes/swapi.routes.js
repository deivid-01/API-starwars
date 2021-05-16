const express = require('express');
const router = express.Router();
const swapiCtrl = require('../controllers/swapi.controller');

router.post('/',swapiCtrl.resetData);


module.exports = router;