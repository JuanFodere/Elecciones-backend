const express = require('express');
const router = express.Router();

const { verEstadoCircuito } = require('../controllers/circuitoController');
const { abrirCircuito } = require('../controllers/circuitoController'); 
const { cerrarCircuito } = require('../controllers/circuitoController');
const { habilitaResultados } = require('../controllers/circuitoController');
const { existeCircuito } = require('../controllers/circuitoController');

router.get('/:id/estado', verEstadoCircuito);
router.post('/:id/abrir', abrirCircuito);
router.post('/:id/cerrar', cerrarCircuito);
router.get('/:id/habilitaResultados', habilitaResultados);
router.post('/existe', existeCircuito);

module.exports = router;