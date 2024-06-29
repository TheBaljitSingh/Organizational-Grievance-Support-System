const express = require("express");

const {registerUser, loginUser, getUserDetails} = require("../Controller/userController")
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails)



module.exports = router;