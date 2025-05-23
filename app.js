const express = require('express');
const cors = require('cors');
const db = require('./models/db');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use(cors({
    origin: 'http://localhost:3000', // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  
app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const blogRoutes = require('./routes/blogs');
app.use('/api/blogs', blogRoutes);
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = app;
