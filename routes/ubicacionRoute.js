const express = require("express");
const router = express.Router();
const ubiController = require('../controllers/ubicacionController');
router.get('/', ubiController.obtenerDatos);
router.get('/:id', ubiController.obtenerPorId); 
router.post('/', ubiController.agregarUbicacion);
router.put('/:id', ubiController.actualizarUbicacion);
router.delete('/:id', ubiController.borrarUbicacion);
module.exports = router;