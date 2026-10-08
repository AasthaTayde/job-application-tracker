const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const requireAuth = require("../middleware/authMiddleware");

router.use(requireAuth);

// CREATE job for the authenticated user
router.post("/", async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.userId,
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET only the authenticated user's jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.userId }).sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE only if the job belongs to the authenticated user
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE only if the job belongs to the authenticated user
router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    res.json({ message: "Job deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
