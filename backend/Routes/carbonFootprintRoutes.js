const express = require('express');
const { saveResult, getResults } = require('../Controllers/carbonFootprintController');

const router = express.Router();

// Route to save results
router.post('/save', saveResult);

// Route to fetch results
router.get('/', getResults);

module.exports = router;
