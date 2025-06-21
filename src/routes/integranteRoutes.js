const express = require('express');
const router = express.Router();

const {confirmarAutoridad} = require('../controllers/integranteController');

router.post('/confirmarAutoridad', confirmarAutoridad);

module.exports = router;