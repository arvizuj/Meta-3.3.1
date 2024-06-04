const express = require("express");
const router = express.Router();
const tagController = require('../controllers/tagController');
router.get('/', tagController.obtenerDatos);
router.get('/:id', tagController.obtenerPorId); 
router.post('/', tagController.agregarTag);
router.put('/:id', tagController.actualizarTag);
router.delete('/:id', tagController.borrarTag);
module.exports = router;