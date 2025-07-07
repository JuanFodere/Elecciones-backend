const express = require('express');
const router = express.Router();

const {votarLista} = require('../controllers/votoController');
const {marcarVoto} = require('../controllers/votoController');

router.post('/votar', votarLista);
router.post('/marcar', marcarVoto);


module.exports = router;