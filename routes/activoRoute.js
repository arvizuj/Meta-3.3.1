const express = require("express");
const router = express.Router();
const activoController = require('../controllers/activoController');
router.get('/', activoController.obtenerDatos);
router.get('/:id', activoController.obtenerPorId); 
router.post('/', activoController.agregarActivo);
router.put('/:id', activoController.actualizarActivo);
router.delete('/:id', activoController.borrarActivo);
module.exports = router;
