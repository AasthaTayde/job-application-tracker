
const Job = require("../models/Job");

// CREATE job
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      user: req.userId,
    });

    return res.status(201).json(job);
  } catch (error) {
    console.error("Create job error:", error);
    return res.status(500).json({
      message: "Could not create job.",
    });
  }
};

// GET authenticated user's jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.userId,
    }).sort({ date: -1 });

    return res.json(jobs);
  } catch (error) {
    console.error("Get jobs error:", error);
    return res.status(500).json({
      message: "Could not retrieve jobs.",
    });
  }
};

// UPDATE job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    return res.json(job);
  } catch (error) {
    console.error("Update job error:", error);
    return res.status(500).json({
      message: "Could not update job.",
    });
  }
};

// DELETE job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!job) {
      return res.status(404).json({
        message: "Job not found.",
      });
    }

    return res.json({
      message: "Job deleted successfully.",
    });
  } catch (error) {
    console.error("Delete job error:", error);
    return res.status(500).json({
      message: "Could not delete job.",
    });
  }
};
