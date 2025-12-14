const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
//const userController = require("../controllers/users.js");
const profileController = require("../controllers/profile.js");

router.route("/").get(isLoggedIn, wrapAsync(profileController.renderProfile));


module.exports = router;