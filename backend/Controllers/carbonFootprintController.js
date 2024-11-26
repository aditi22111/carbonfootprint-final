const Result = require('../models/CarbonFootprint');

// Save result to database
const saveResult = async (req, res) => {
    try {
        const { totalEmission, totalOffset } = req.body;

        // Validate the required fields
        if (totalEmission == null || totalOffset == null || isNaN(totalEmission) || isNaN(totalOffset)) {
            return res.status(400).json({ error: 'Invalid totalEmission or totalOffset value' });
        }

        // Create a new result with totalEmission and totalOffset
        const result = new Result({
            totalEmission: Number(parseFloat(totalEmission).toFixed(2)), // Ensure proper formatting
            totalOffset: Number(parseFloat(totalOffset).toFixed(2)),     // Ensure proper formatting
        });

        await result.save();

        res.status(201).json({ message: 'Result saved successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save result', details: error.message });
    }
};


// Fetch all results
const getResults = async (req, res) => {
    try {
        const results = await Result.find();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch results', details: error.message });
    }
};

module.exports = { saveResult, getResults };
