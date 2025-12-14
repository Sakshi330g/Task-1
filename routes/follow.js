const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const userController = require("../controllers/userController");
const { isLoggedIn } = require("../middleware");

// router.get("/all", isLoggedIn, wrapAsync(userController.showAllUsers));

// router.post("/:id/follow", isLoggedIn, wrapAsync(userController.followUser));
// router.post("/:id/unfollow", isLoggedIn, wrapAsync(userController.unfollowUser));

// module.exports = router;