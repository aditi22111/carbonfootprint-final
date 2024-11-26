const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
 const ensureAuthenticated = require('./Middlewares/Auth');  
 const carbonFootprintRoutes = require('./Routes/carbonFootprintRoutes');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

// Health check route
app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Middleware setup
app.use(express.json({ limit: '50mb' }));
app.use(cors({
    origin: 'http://localhost:3000', // Allow only your frontend to access the backend
    methods: ['GET', 'POST'], // Allow specific methods
}));

// Routes
app.use('/auth', AuthRouter);
app.use('/api', carbonFootprintRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
