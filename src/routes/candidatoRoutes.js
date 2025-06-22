const express = require('express');
const router = express.Router();

const { getCandidatos } = require('../controllers/candidatoController');

router.post('/getCandidatos', getCandidatos);

module.exports = router;