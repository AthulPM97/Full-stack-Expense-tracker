const express = require('express');

const premiumController = require('../controllers/premium');

const router = express.Router();

router.get('/leaderboard', premiumController.getLeaderboard);

module.exports = router;