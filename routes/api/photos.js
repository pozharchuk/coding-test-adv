const express = require('express');

const router = express.Router();
const pool = require('../db');
const { authenticateJWT } = require('../services/auth');

router.get('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    const queryResult = await pool.query(
      'SELECT photo_url FROM animal_photos WHERE category_id = $1',
      [categoryId],
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
