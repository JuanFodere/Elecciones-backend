const express = require('express');
const router = express.Router();

const { getCandidatos } = require('../controllers/candidatoController');
const { getPartidosEleccion } = require('../controllers/candidatoController');

router.post('/getCandidatos', getCandidatos);
router.post('/partidosEleccion', getPartidosEleccion); 

module.exports = router;