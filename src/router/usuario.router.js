const express = require('express');
const router = express.Router();
const { crear, login, mostrarTodos, obtenerPorId, actualizar, eliminar } = require('../controller/usuario.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/crear', crear);
router.post('/login', login);
router.get('/', authMiddleware, mostrarTodos); // Ruta protegida
router.get('/:id', authMiddleware, obtenerPorId); // Ruta protegida
router.put('/:id', authMiddleware, actualizar); // Ruta protegida
router.delete('/:id', authMiddleware, eliminar); // Ruta protegida

module.exports = router;