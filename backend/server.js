console.log("✅ Server file loaded");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/teamDB')
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });

// 🔥 Load routes
console.log("👉 Loading routes...");
const memberRoutes = require('./routes/memberRoutes');
app.use('/api', memberRoutes);

// Direct test route (server check)
app.get('/', (req, res) => {
  res.send("Server is working");
});

// Extra test route (bypass routes file)
app.get('/test', (req, res) => {
  res.send("Direct test route working");
});

// Start server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});