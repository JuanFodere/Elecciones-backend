const express = require('express');
const router = express.Router();

const { cargarEleccion } = require('../controllers/adminController');
const { cargarCircuito } = require('../controllers/adminController');
const { cargarEstablecimiento } = require('../controllers/adminController');
const { cargarCandidato } = require('../controllers/adminController');
const { cargarIntegrante } = require('../controllers/adminController');
const { cargarPapeleta } = require('../controllers/adminController');
const { cargarLista } = require('../controllers/adminController');
const { cargarIntegracionLista } = require('../controllers/adminController');
const { cargarPartidoPolítico } = require('../controllers/adminController');
const { cargarParticipación } = require('../controllers/adminController');
const { cargarPolicía } = require('../controllers/adminController');

router.post('/cargarEleccion', cargarEleccion);
router.post('/cargarCircuito', cargarCircuito);
router.post('/cargarEstablecimiento', cargarEstablecimiento);
router.post('/cargarCandidato', cargarCandidato);
router.post('/cargarIntegrante', cargarIntegrante);
router.post('/cargarPapeleta', cargarPapeleta);
router.post('/cargarLista', cargarLista);
router.post('/cargarIntegracionLista', cargarIntegracionLista);
router.post('/cargarPartidoPolitico', cargarPartidoPolítico);
router.post('/cargarParticipacion', cargarParticipación);
router.post('/cargarPolicia', cargarPolicía);

module.exports = router;

