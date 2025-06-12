const express = require('express');
const router = express.Router();

const {getVotantePorCi} = require('../controllers/votanteController');

router.get('/:ci', getVotantePorCi);

module.exports = router;