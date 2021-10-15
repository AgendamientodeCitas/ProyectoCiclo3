const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController')
const auth = require('../middlewares/auth')

router.post('/add', UsuarioController.add);
router.post('/login', UsuarioController.login);
router.get('/list', auth.verificarUsuario, UsuarioController.list);
router.get('/listpaciente', UsuarioController.listPaciente);
router.get('/listmedico', UsuarioController.listMedico);
router.put('/enabled', UsuarioController.enabled);
router.put('/disabled', UsuarioController.disabled);
router.put('/update', UsuarioController.update);

module.exports = router;