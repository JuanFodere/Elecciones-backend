const express = require('express');
const router = express.Router();

const {getVotantePorCi} = require('../controllers/votanteController');
const {getVotanteElección} = require('../controllers/votanteController');
const {getAllVotantes} = require('../controllers/votanteController');

router.get('/:ci', getVotantePorCi);
router.post('/eleccion', getVotanteElección);
router.get('/', getAllVotantes);

module.exports = router;