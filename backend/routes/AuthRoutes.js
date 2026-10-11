//connects incoming authentication requests to the correct controller function
const express = require("express");
const router = express.Router();//creating separate router for authentication endpoints

const authController = require("../controllers/authController");
const requireAuth = require("../middleware/authMiddleware");//read JWT cookie,verifies the token,identifies the authenticated user.

router.post("/register", authController.register);//create new user,validate details,hashes password,saves the user.
router.post("/login", authController.login);//check user credential, if valid controller creates a jwt and sends it in an HTTP-only cookie
router.post("/logout", authController.logout);//clear the auth cookie
router.get("/me", requireAuth, authController.me);//return info about currently authenticated user

module.exports = router;
