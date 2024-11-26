const CarbonFootprintModel = require('../models/CarbonFootprint');
const UserModel = require('../models/user');

// Example controller
const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await CarbonFootprintModel.aggregate([
            {
                $lookup: {
                    from: 'users', // The collection you're joining with (the 'users' collection)
                    localField: 'userId', // Field from CarbonFootprint collection (userId is expected to be ObjectId)
                    foreignField: '_id', // Field from users collection (_id)
                    as: 'user', // Array of matched users
                },
            },
            {
                $unwind: '$user', // Unwind the user array to flatten the matched user data
            },
            {
                $project: {
                    name: '$user.name', // Extract user name
                    email: '$user.email', // Extract user email
                    totalEmission: 1, // Include totalEmission field from the CarbonFootprint collection
                    totalOffset: 1, // Include totalOffset field from the CarbonFootprint collection
                },
            },
            {
                $sort: { totalEmission: 1 }, // Sort by total emission in ascending order
            },
        ]);

        // Send the leaderboard data as JSON
        res.status(200).json({ success: true, data: leaderboard });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    getLeaderboard,
};
