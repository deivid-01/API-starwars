const express = require('express');
const router = express.Router();
const planetCtrl = require('../controllers/planets.controller');


/**
 * @swagger
 * components:
 *  schemas:
 *      Planets:
 *          type:Object
 *          required:
 *              - name
 *          properties:
 *              id:
 *                  type:string
 *                  description:The auto generated id of the planet
 *          example:
 *              id: 12313
 *              title: Planet 1
 *              name: Planet1
 */

/**
 * @swagger
 * /planets:
 *  get:
 *      summary: List of planets
 *      responses:
 *         200: 
 *          description: The list of the planets
 *              
 */
router.get('/:id',planetCtrl.getOne);

router.get('/',planetCtrl.getAll);

router.post('/',planetCtrl.createOne);
//router.post('/',planetCtrl.createMany);

router.put('/:id',planetCtrl.updateOne);

router.delete('/:id',planetCtrl.deleteOne);
router.delete('/',planetCtrl.deleteAll);

module.exports = router;