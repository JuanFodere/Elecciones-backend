const express = require('express');
const router = express.Router();

const { loginAdmin } = require('../controllers/authController');
const { loginVotante } = require('../controllers/authController');
const { loginMesa } = require('../controllers/authController');

router.post('/admin', loginAdmin);
router.post('/votante', loginVotante);
router.post('/integrante', loginMesa);

module.exports = router;