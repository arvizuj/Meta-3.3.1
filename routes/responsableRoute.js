const express = require("express");
const router = express.Router();
const respController = require('../controllers/responsableController');
router.get('/', respController.obtenerDatos);
router.get('/:id', respController.obtenerPorId); 
router.post('/', respController.agregarResponsable);
router.put('/:id', respController.actualizarResponsable);
router.delete('/:id', respController.borrarResponsable);
module.exports = router;