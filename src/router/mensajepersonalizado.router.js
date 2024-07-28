const express = require('express');
const router = express.Router();
const { mostrar, mandar, obtenerPorId, eliminar, actualizar } = require('../controller/mensajepersonalizado.controller');

router.post('/', mandar);
router.get('/', mostrar);
router.get('/:id', obtenerPorId);
router.delete('/:id', eliminar);
router.put('/:id', actualizar )

module.exports = router;
