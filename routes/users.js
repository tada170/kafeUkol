// routes/users.js
const express = require('express');
const router = express.Router();
const Service = require('../service');

// Assume you have a way to get DB connection
const dbConnection = require('../dbConnection'); // Create dbConnection.js to manage DB connection
const service = new Service(dbConnection);

router.get('/', async (req, res) => {
    try {
        const people = await service.getPeopleList();
        res.json(people);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
