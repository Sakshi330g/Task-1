const Post = require("../models/post.js");
module.exports.renderProfile = async (req, res) => {
    const user = req.user;
     const followersCount = user.followers.length;
    const followingCount = user.following.length;
    const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });
    res.render("profile/profile.ejs", { user, posts, followersCount, followingCount });
}