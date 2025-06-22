const express = require('express');
const router = express.Router();

const {getGanadorNacional} = require('../controllers/resultadoController');

router.post('/ganadorNacional', getGanadorNacional);


module.exports = router;