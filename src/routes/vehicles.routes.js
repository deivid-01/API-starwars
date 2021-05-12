const express = require('express');
const router = express.Router();
const vehicleCtrl = require('../controllers/vehicles.controller');



router.get('/:id',vehicleCtrl.getOne);
router.get('/',vehicleCtrl.getAll);

router.post('/',vehicleCtrl.createOne);
//router.post('/',vehicleCtrl.createMany);

router.put('/:id',vehicleCtrl.updateOne);

router.delete('/:id',vehicleCtrl.deleteOne);
router.delete('/',vehicleCtrl.deleteMany);

module.exports = router;