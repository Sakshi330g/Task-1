const Post = require("../models/post");
module.exports.renderNewPostForm = (req, res) => {
    res.render("posts/new.ejs");
}

module.exports.createNewPost = async (req, res) => {
     const { image, caption } = req.body;
    const post = new Post({
      image,
      caption,
      author: req.user._id  
    });
    await post.save();
    res.redirect("/profile");
}

module.exports.showPost = async (req, res) => {
    const { id } = req.params;
    // const post = await Post.findById(id)
    // .populate("author")
    // .populate("comments.author");
    const post = await Post.findById(id)
  .populate("author", "username")
  .populate({
    path: "comments",
    populate: {
      path: "author",
      select: "username"
    }
  });

  if (!post) return res.redirect("/profile");

  const likesCount = post.likes.length;
  const dislikesCount = post.dislikes.length;
  const comments = post.comments;

  res.render("posts/show", { post, likesCount, dislikesCount, comments });
}
;

module.exports.showAllPosts = async (req, res) => {
    const posts = await Post.find({
    author: { $ne: req.user._id }   // exclude current user's posts
  })
    .populate("author", "username")
    .populate({
      path: "comments",
      populate: { path: "author", select: "username" }
    })
    .sort({ createdAt: -1 });

  res.render("posts/index.ejs", { posts });
}

module.exports.showUserPosts = async (req, res) => {
     const { id } = req.params;
    // const post = await Post.findById(id)
    // .populate("author")
    // .populate("comments.author");
    const post = await Post.findById(id)
  .populate("author", "username")
  .populate({
    path: "comments",
    populate: {
      path: "author",
      select: "username"
    }
  });

  if (!post) return res.redirect("/profile");

  const likesCount = post.likes.length;
  const dislikesCount = post.dislikes.length;
  const comments = post.comments;

  res.render("posts/show", { post, likesCount, dislikesCount, comments });
};

module.exports.likePost = async (req, res) => {
  const { id } = req.params; // post ID
  const post = await Post.findById(id);
  if (!post) return res.redirect("/posts");

  const userId = req.user._id;

  // If user already liked, remove the like (toggle)
  if (post.likes.includes(userId)) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
    
    post.dislikes.pull(userId);
  }

  await post.save();
  res.redirect(`/posts/${id}`);
};

module.exports.dislikePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) return res.redirect("/posts");

  const userId = req.user._id;

  if (post.dislikes.includes(userId)) {
    post.dislikes.pull(userId);
  } else {
    post.dislikes.push(userId);
    post.likes.pull(userId);
  }

  await post.save();
  res.redirect(`/posts/${id}`);
};
