const express = require('express');
const router = express.Router();
const swapiCtrl = require('../controllers/swapi.controller');

router.post('/',swapiCtrl.resetData);
router.post('/test',swapiCtrl.test);


module.exports = router;