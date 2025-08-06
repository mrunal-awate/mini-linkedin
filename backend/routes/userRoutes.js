const express = require('express');
const router = express.Router();
const { getUserProfileById } = require('../controllers/userController');

router.get('/:id', getUserProfileById);

module.exports = router;
