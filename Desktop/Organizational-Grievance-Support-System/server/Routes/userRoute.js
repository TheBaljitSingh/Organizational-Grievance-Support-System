const express = require("express");

const {registerUser, loginUser, getUserDetails, logoutUser, createGrievance, getGrievances, getGrievancesAdmin} = require("../Controller/userController")
const {isAuthenticatedUser, authorizeRoles} = require("../middleware/auth")
// import {upload} from "../middleware/multer.middleware.js";
const upload= require("../middleware/multer.middleware.js")

const router = express.Router();

router.route("/register").post(upload.fields([
    {name: "avatar", maxCount: 1,}
]) ,registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/creategrievance").post(isAuthenticatedUser, createGrievance);
router.route("/grievances").get( isAuthenticatedUser, getGrievances)
router.route("/grievances/admin").get(isAuthenticatedUser, getGrievancesAdmin);

module.exports = router;