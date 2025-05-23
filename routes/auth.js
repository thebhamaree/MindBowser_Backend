// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../models/db');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // 1. Find user by email
      const [rows] = await db.execute('SELECT * FROM blogusers WHERE email = ?', [email]);
  
      if (rows.length === 0) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      const user = rows[0];
  
      // 2. Compare hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }
  
      // 3. Successful login
      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if user/email exists
    const [existing] = await db.execute('SELECT id FROM blogusers WHERE username = ? OR email = ?', [username, email]);
    if (existing.length > 0) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.execute(
      'INSERT INTO blogusers (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
