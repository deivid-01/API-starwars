const express = require('express');
const router = express.Router();
const starshipCtrl = require('../controllers/starships.controller');



router.get('/:id',starshipCtrl.getOne);
router.get('/',starshipCtrl.getAll);

router.post('/',starshipCtrl.createOne);
//router.post('/',starshipCtrl.createMany);

router.put('/:id',starshipCtrl.updateOne);

router.delete('/:id',starshipCtrl.deleteOne);
router.delete('/',starshipCtrl.deleteMany);

module.exports = router;