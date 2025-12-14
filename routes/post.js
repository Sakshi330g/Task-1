const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/users.js");
const postController = require("../controllers/post.js");
const Post = require("../models/post.js");
const commentController = require("../controllers/comment.js");

router.route("/").get(isLoggedIn, wrapAsync(postController.showAllPosts));

router.route("/new").get(isLoggedIn, postController.renderNewPostForm)
.post(isLoggedIn, wrapAsync(postController.createNewPost));

router.route("/:id").get(isLoggedIn, wrapAsync(postController.showPost) );
router.route("/others/:id").get(isLoggedIn, wrapAsync(postController.showUserPosts) );
module.exports = router;

router.route("/:id/comments").post(
    isLoggedIn,
    wrapAsync(commentController.createComment)
);

router.post("/:id/like", isLoggedIn, wrapAsync(postController.likePost));
router.post("/:id/dislike", isLoggedIn, wrapAsync(postController.dislikePost));
