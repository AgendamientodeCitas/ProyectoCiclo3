const express = require('express');
const router = express.Router();

const usuarioRouter = require('./usuario')
const documentoRouter = require('./documento')
const estadoRouter = require('./estado')
const rolRouter = require('./rol')
const agendaRouter = require('./agenda')


router.use('/usuario', usuarioRouter);
router.use('/documento', documentoRouter);
router.use('/estado', estadoRouter);
router.use('/rol', rolRouter);
router.use('/agenda', agendaRouter);


module.exports = router;