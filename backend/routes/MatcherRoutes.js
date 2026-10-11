
const express = require("express");//helps create and manage routes
const multer = require("multer");//handles file uploads sent through HTTP requests,such as a PDF resume, handles multipart form data.

const router = express.Router();

const requireAuth = require("../middleware/authMiddleware");
const matcherController = require("../controllers/matcherController");

const upload = multer({//configure multer
  storage: multer.memoryStorage(),//store file temproray in sever memory as buffer
  limits: {
    fileSize: 5 * 1024 * 1024,//file size limit 5MB
  },
});

router.post("/match",requireAuth,upload.single("resume"),matcherController.matchResume);//accept one uploaded file whose form field name is resume
module.exports = router;
