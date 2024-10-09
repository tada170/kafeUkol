// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const drinksRoutes = require('./routes/drinks');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/drinks', drinksRoutes);
app.use('/api/users', usersRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
