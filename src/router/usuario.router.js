const express = require('express');
const router = express.Router();
const { crear, login, mostrarTodos, obtenerPorId, actualizar, eliminar } = require('../controller/usuario.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/crear', crear);
router.post('/login', login);
router.get('/',  mostrarTodos); 
router.get('/:id', obtenerPorId); 
router.put('/:id', actualizar); 
router.delete('/:id', eliminar); 

module.exports = router;