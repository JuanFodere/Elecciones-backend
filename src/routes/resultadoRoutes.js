const express = require('express');
const router = express.Router();

const {getResultadoNacional} = require('../controllers/resultadoController');
const {getResultadoNacionalPorCircuito} = require('../controllers/resultadoController');
const {getResultadoNacionalPorPartido} = require('../controllers/resultadoController');
const {getResultadoNacionalPorDepartamento} = require('../controllers/resultadoController');

router.post('/resultadoNacional', getResultadoNacional);
router.post('/resultadoNacionalPorCircuito', getResultadoNacionalPorCircuito);
router.post('/resultadoNacionalPorPartido', getResultadoNacionalPorPartido);
router.post('/resultadoNacionalPorDepartamento', getResultadoNacionalPorDepartamento);

module.exports = router;