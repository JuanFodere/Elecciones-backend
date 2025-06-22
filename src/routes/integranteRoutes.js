const express = require('express');
const router = express.Router();

const {confirmarAutoridad} = require('../controllers/integranteController');
const {verCircuitoAsignado} = require('../controllers/integranteController');

router.post('/confirmarAutoridad', confirmarAutoridad);
router.post('/circuitoAsignado', verCircuitoAsignado);

module.exports = router;