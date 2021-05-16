const express = require('express');
const router = express.Router();
const characterCtrl = require('../controllers/characters.controller');



router.get('/:id',characterCtrl.getOne);
router.get('/',characterCtrl.getAll);

router.post('/',characterCtrl.createOne);
router.put('/:id',characterCtrl.updateOne);

router.delete('/:id',characterCtrl.deleteOne);
router.delete('/',characterCtrl.deleteAll);

module.exports = router;