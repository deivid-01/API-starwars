const express = require('express');
const router = express.Router();
const starshipCtrl = require('../controllers/starships.controller');



router.get('/:id',starshipCtrl.getOne);
router.get('/',starshipCtrl.getAll);

router.post('/',starshipCtrl.createOne);

router.put('/:id',starshipCtrl.updateOne);

router.delete('/:id',starshipCtrl.deleteOne);
router.delete('/',starshipCtrl.deleteAll);

module.exports = router;