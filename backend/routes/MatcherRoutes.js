
const express = require("express");
const multer = require("multer");

const router = express.Router();

const requireAuth = require("../middleware/authMiddleware");
const matcherController = require("../controllers/matcherController");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/match",
  requireAuth,
  upload.single("resume"),
  matcherController.matchResume
);

module.exports = router;
