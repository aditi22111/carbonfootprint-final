const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../../carbon-footprint-calculator-master - Copy/backend/models/user');


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists. Please login.', success: false });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ name, email, password: hashedPassword });
        await user.save();

      
        const jwtToken = jwt.sign(
            { id: user._id, name: user.name }, 
            process.env.JWT_SECRET,  
            { expiresIn: '300h' }
        );

        res.status(201).json({ message: 'Signup successful', success: true, jwtToken, name: user.name });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Request Body:', req.body);

        const user = await UserModel.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(403).json({ message: 'Invalid credentials', success: false });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log('Invalid password');
            return res.status(403).json({ message: 'Invalid credentials', success: false });
        }

        const token = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Login successful, token generated:', token);
        res.status(200).json({ message: 'Login successful', success: true, token, name: user.name });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};


const updateUserDetails = async (req, res) => {
    try {
        const { phone, distanceToOffice, vehicleType, fuelType, commuteMethod, energyUsage, diet, recycling, consent, date, userId } = req.body;

        // Use the userId as email to find the user
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: userId }, // Search by email (userId)
            {
                phone,
                distanceToOffice,
                vehicleType,
                fuelType,
                commuteMethod,
                energyUsage,
                diet,
                recycling,
                consent,
                date
            },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: `User with email ${userId} not found`, success: false });
        }

        res.status(200).json({ message: 'User details updated successfully', success: true, user: updatedUser });
    } catch (error) {
        console.error('Error updating user details:', error); // Log the error details
        res.status(500).json({ message: 'Internal server error', success: false, error: error.message }); // Return the error message for better visibility
    }
};




module.exports = { signup, login, updateUserDetails };