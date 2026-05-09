const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// CREATE job
router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE job
router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(job);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE job
router.delete("/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job Deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;