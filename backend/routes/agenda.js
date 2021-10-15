const express = require('express');
const router = express.Router();

const AgendaController = require('../controllers/AgendaController')

router.post('/add', AgendaController.add);
router.get('/list', AgendaController.list);
router.get('/list2', AgendaController.list2);
router.put('/enabled', AgendaController.enabled);
router.put('/disabled', AgendaController.disabled);
router.put('/update', AgendaController.update);
// router.delete('/remove', AgendaController.remove);

module.exports = router;