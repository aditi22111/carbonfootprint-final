const CarbonFootprint = require('../models/CarbonFootprint');

const getResults = async (req, res) => {
    try {
        const results = await CarbonFootprint.find(); // Example of getting results
        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ error: 'Failed to fetch results' });
    }
};

const saveResult = async (req, res) => {
    const { totalEmission, totalOffset, userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    try {
        const newResult = new CarbonFootprint({
            totalEmission,
            totalOffset,
            userId,
        });

        const savedResult = await newResult.save();
        res.status(200).json(savedResult);
    } catch (error) {
        console.error('Error saving result:', error);
        res.status(500).json({ error: 'Failed to save result', details: error.message });
    }
};

module.exports = {
    getResults,
    saveResult,
};
