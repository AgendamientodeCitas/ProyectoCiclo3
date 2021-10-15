const express = require('express');
const router = express.Router();

const DocumentoController = require('../controllers/DocumentoController')

router.post('/add', DocumentoController.add);
router.get('/list', DocumentoController.list);
router.put('/enabled', DocumentoController.enabled);
router.put('/disabled', DocumentoController.disabled);
router.put('/update', DocumentoController.update);
router.delete('/remove', DocumentoController.remove);

module.exports = router;