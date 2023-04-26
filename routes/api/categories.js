const express = require('express');

const router = express.Router();
const pool = require('../db');
const { authenticateJWT } = require('../services/auth');

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

// Add a new category
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { category } = req.body;

    // Check if category already exists
    const categoryExists = await pool.query('SELECT * FROM animal_categories WHERE category = $1', [category]);
    if (categoryExists.rowCount > 0) {
      return res.status(409).json({ message: 'Category already exists' });
    }

    // Add the new category to the animal_categories table
    await pool.query('INSERT INTO animal_categories (category) VALUES ($1)', [category]);

    res.status(201).json({ message: 'Category created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating category' });
  }
});

// Delete a category by ID
router.delete('/:categoryId', authenticateJWT, async (req, res) => {
  try {
    const { categoryId } = req.params;

    // Delete the category from the animal_categories table
    await pool.query('DELETE FROM animal_categories WHERE id = $1', [categoryId]);

    // Delete the associated photos from the animal_photos table
    await pool.query('DELETE FROM animal_photos WHERE category_id = $1', [categoryId]);

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting category' });
  }
});

module.exports = router;
