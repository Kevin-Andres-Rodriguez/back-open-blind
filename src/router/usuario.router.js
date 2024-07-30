const express = require('express');
const router = express.Router();
const { crear, login } = require('../controller/usuario.controller');

router.post('/crear', crear);
router.post('/login', login);

module.exports = router;