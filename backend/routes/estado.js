const express = require('express');
const router = express.Router();

const EstadoController = require('../controllers/EstadoController')

router.post('/add', EstadoController.add);
router.get('/list', EstadoController.list);
router.put('/update', EstadoController.update);
router.delete('/remove', EstadoController.remove);

module.exports = router;