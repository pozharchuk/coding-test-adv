const express = require('express');

const router = express.Router();
const pool = require('../db');
const { authenticateJWT } = require('../services/auth');

// Get photo URLs for multiple category IDs
router.get('/', async (req, res) => {
  const categoryIds = req.query.id ? req.query.id.split(',') : [];
  let query;

  if (categoryIds.length === 0) {
    query = 'SELECT photo_url FROM animal_photos';
  } else {
    // Generate placeholders for the query parameters, e.g., '$1, $2, $3'
    const placeholders = categoryIds.map((_, index) => `$${index + 1}`).join(', ');
    query = `SELECT photo_url FROM animal_photos WHERE category_id IN (${placeholders})`;
  }

  try {
    const queryResult = await pool.query(
      query,
      categoryIds,
    );
    res.json(queryResult.rows.map((row) => row.photo_url));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching photo URLs' });
  }
});

// Add a photo to a specific category
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const { categoryId, photo_url: photoUrl } = req.body;

    await pool.query('INSERT INTO animal_photos (category_id, photo_url) VALUES ($1, $2)', [categoryId, photoUrl]);
    res.status(201).json({ message: 'Photo added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding photo' });
  }
});

// Delete a photo by ID
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const { categoryId } = req.params;

    await pool.query('DELETE FROM animal_photos WHERE id = $1', [categoryId]);
    res.status(200).json({ message: 'Photo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting photo' });
  }
});

module.exports = router;
