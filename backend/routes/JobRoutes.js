
const express = require("express");
const router = express.Router();

const jobController = require("../controllers/jobController");
const requireAuth = require("../middleware/authMiddleware");

router.use(requireAuth);

router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

module.exports = router;
