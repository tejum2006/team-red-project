console.log("✅ Routes file loaded");

const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const multer = require('multer');

// 🟢 Storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });


// 🟢 TEST ROUTE
router.get('/test', (req, res) => {
  console.log("👉 /api/test hit");
  res.send("API working");
});


// 🟢 ADD MEMBER
router.post('/members', upload.single('image'), async (req, res) => {
  try {
    console.log("👉 Adding member:", req.body);

    const newMember = new Member({
      name: req.body.name,
      role: req.body.role,
      email: req.body.email,
      image: req.file ? req.file.filename : '',

      rollNumber: req.body.rollNumber,
      project: req.body.project,
      certificate: req.body.certificate,
      internship: req.body.internship,
      about: req.body.about,

      // ✅ SAFE PARSE
      hobbies: req.body.hobbies ? JSON.parse(req.body.hobbies) : []
    });

    await newMember.save();
    res.json(newMember);

  } catch (err) {
    console.log("POST ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🟢 GET ALL MEMBERS (FINAL FORMAT FOR RECORD)
router.get('/members', async (req, res) => {
  try {
    console.log("👉 Fetching members...");

    const members = await Member.find();

    const formattedMembers = members.map(m => ({
      _id: m._id,
      name: m.name,
      email: m.email,              // ✅ FIXED
      roll: m.rollNumber,
      year: "2024",
      degree: "B.Tech",
      project: m.project,
      hobbies: Array.isArray(m.hobbies)
        ? m.hobbies.join(', ')
        : m.hobbies || "",
      certificate: m.certificate,
      internship: m.internship,
      aboutYourAim: m.about,
      image: m.image
    }));

    res.json(formattedMembers);

  } catch (err) {
    console.log("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🟢 GET MEMBER BY ID
router.get('/members/:id', async (req, res) => {
  try {
    const m = await Member.findById(req.params.id);

    if (!m) {
      return res.status(404).json({ message: "Member not found" });
    }

    const formattedMember = {
      _id: m._id,
      name: m.name,
      email: m.email,            // ✅ FIXED
      roll: m.rollNumber,
      year: "2024",
      degree: "B.Tech",
      project: m.project,
      hobbies: Array.isArray(m.hobbies)
        ? m.hobbies.join(', ')
        : m.hobbies || "",
      certificate: m.certificate,
      internship: m.internship,
      aboutYourAim: m.about,
      image: m.image
    };

    res.json(formattedMember);

  } catch (err) {
    console.log("GET BY ID ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// 🟢 DELETE MEMBER
router.delete('/members/:id', async (req, res) => {
  try {
    console.log("👉 Deleting member:", req.params.id);

    const deletedMember = await Member.findByIdAndDelete(req.params.id);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({ message: "Member deleted successfully" });

  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;