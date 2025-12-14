const Comment = require("../models/comment.js");
const Post = require("../models/post.js");

module.exports.createComment = async (req, res) => {
    const { id } = req.params;          // post id
  const { text } = req.body;  
  console.log("PARAM ID:", id);
       

  const post = await Post.findById(id);
  if (!post) {
    return res.redirect("/posts");
  }

  const comment = new Comment({
    text: text,
    author: req.user._id,
    post: id,
  });

  await comment.save();

  post.comments.push(comment._id);
  await post.save();

  res.redirect(`/posts/${id}`);
}