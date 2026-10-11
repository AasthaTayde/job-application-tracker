
const express = require("express");
const router = express.Router();//create separate router to define endpoints

const jobController = require("../controllers/jobController");//so that each controller can call the appropriate function when a matching request arrives.
const requireAuth = require("../middleware/authMiddleware");

router.use(requireAuth);//all routes registered after that statement use the auth middleware

router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

module.exports = router;//to export the router so that other files,especially server.js can import and use it to call function from controller.
