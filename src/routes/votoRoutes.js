const express = require('express');
const router = express.Router();

const {votarLista} = require('../controllers/votoController');

router.post('/votar', votarLista);


module.exports = router;