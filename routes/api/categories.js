const express = require('express');

const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    // Fetch all animals categories
    const queryResult = await pool.query('SELECT * FROM animal_categories');
    res.json(queryResult.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching categories' });
  }
});

module.exports = router;
