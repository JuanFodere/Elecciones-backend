const express = require('express');
const router = express.Router();

const { getListasElección } = require('../controllers/listaController');

router.post('/listasEleccion', getListasElección);

module.exports = router;