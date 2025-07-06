const express = require('express');
const router = express.Router();

const { getListasElección } = require('../controllers/listaController');
const { getPapeletaEleccion } = require('../controllers/listaController');
const { getIdPapeleta } = require('../controllers/listaController');

router.post('/listasEleccion', getListasElección);
router.post('/IDpapeleta', getPapeletaEleccion);
router.post('/papeleta', getIdPapeleta);


module.exports = router;