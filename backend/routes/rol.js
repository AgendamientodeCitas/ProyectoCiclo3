const express = require('express');
const router = express.Router();

const RolController = require('../controllers/RolController')

router.post('/add', RolController.add);
router.get('/list', RolController.list);
router.put('/enabled', RolController.enabled);
router.put('/disabled', RolController.disabled);
router.put('/update', RolController.update);
router.delete('/remove', RolController.remove);

module.exports = router;