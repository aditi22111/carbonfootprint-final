const express = require('express');
const router = express.Router();
const carbonFootprintController = require('../Controllers/carbonFootprintController');  // Ensure this path is correct
const CarbonFootprintModel = require('../models/CarbonFootprint');
const leaderboardController = require('../Controllers/leaderboardController');
// Define routes
router.post('/results', carbonFootprintController.saveResult);  // Correct handler function

router.get('/leaderboard', leaderboardController.getLeaderboard);

module.exports = router;
