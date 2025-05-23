const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcryptjs');
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage });
  router.post('/create', upload.single('image'), async (req, res) => {
    try {
      const { user_id, title, content } = req.body;
      const image_path = req.file ? `/uploads/${req.file.filename}` : null;
  
      await db.execute(
        `INSERT INTO blogs (user_id, title, content, image_path, created_at)
         VALUES (?, ?, ?, ?, NOW())`,
        [user_id, title, content, image_path]
      );
  
      res.status(201).json({ message: 'Blog created successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error creating blog' });
    }
  });
  

// GET: List blogs by a user (optional)
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM blogs WHERE user_id = ?', [userId]);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const [blogs] = await db.execute(
        'SELECT * FROM blogs WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
      );
  
      res.status(200).json(blogs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch blogs' });
    }
  });
// Get all blogs (public)
// Get all blogs with author names
router.get('/all', async (req, res) => {
    try {
      const [rows] = await db.query(`
        SELECT b.*, u.username AS user_name
        FROM blogs b
        JOIN blogusers u ON b.user_id = u.id
        ORDER BY b.created_at DESC
      `);
      res.status(200).json(rows);
    } catch (err) {
      console.error("Error fetching all blogs:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
  router.put('/update/:id', async (req, res) => {
    const blogId = req.params.id;
    const { user_id, title, content, image_path } = req.body;
  
    try {
      // Optional: Check if blog belongs to user_id for security
      await db.execute(
        'UPDATE blogs SET title = ?, content = ?, image_path = ? WHERE id = ? AND user_id = ?',
        [title, content, image_path, blogId, user_id]
      );
  
      res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating blog' });
    }
  });
  
  // Delete blog by ID
  router.delete('/delete/:id', async (req, res) => {
    const blogId = req.params.id;
  
    try {
      await db.execute('DELETE FROM blogs WHERE id = ?', [blogId]);
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting blog' });
    }
  });
  // Assuming Express and a MySQL connection (db) are set up

  router.get('/:id', async (req, res) => {
    const blogId = req.params.id;
  
    try {
      const [rows] = await db.query(
        `SELECT b.*, u.username as user_name
         FROM blogs b
         JOIN blogusers u ON b.user_id = u.id
         WHERE b.id = ?`,
        [blogId]
      );
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Blog not found" });
      }
  
      res.json(rows[0]);
    } catch (err) {
      console.error("Error fetching blog:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  });
  router.post('/update/:id', upload.single('image'), async (req, res) => {
    try {
      const blogId = req.params.id;
      const { user_id, title, content } = req.body;
      const image_path = req.file ? `/uploads/${req.file.filename}` : null;
  
      // Optional: build dynamic SQL depending on image presence
      if (image_path) {
        await db.execute(
          `UPDATE blogs SET title = ?, content = ?, image_path = ? WHERE id = ? AND user_id = ?`,
          [title, content, image_path, blogId, user_id]
        );
      } else {
        await db.execute(
          `UPDATE blogs SET title = ?, content = ? WHERE id = ? AND user_id = ?`,
          [title, content, blogId, user_id]
        );
      }
  
      res.status(200).json({ message: 'Blog updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error updating blog' });
    }
  });
  // Route: GET /api/blogs/user/:username
router.get('/user/:username', async (req, res) => {
  const username = req.params.username;
  try {
    const query = `
      SELECT b.*, u.username AS user_name
      FROM blogs b
      JOIN blogusers u ON b.user_id = u.id
      WHERE u.username = ?
      ORDER BY b.created_at DESC
    `;
    const [rows] = await db.execute(query, [username]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching blogs by user:", error);
    res.status(500).json({ error: "Failed to fetch user blogs" });
  }
});

  module.exports = router;
  
  
module.exports = router;
