const express = require("express");
const router = express.Router();
const activoTagController = require('../controllers/activoTagController');
router.get('/', activoTagController.obtenerDatos);
router.post('/asignar',activoTagController.asignarRelación);
router.delete('/desasignar', activoTagController.desasignarRelación);
module.exports = router;