const express = require('express');
const router = express.Router();
const planetCtrl = require('../controllers/planets.controller');



router.get('/:id',planetCtrl.getOne);
router.get('/',planetCtrl.getAll);

router.post('/',planetCtrl.createOne);
//router.post('/',planetCtrl.createMany);

router.put('/:id',planetCtrl.updateOne);

router.delete('/:id',planetCtrl.deleteOne);
router.delete('/',planetCtrl.deleteMany);

module.exports = router;