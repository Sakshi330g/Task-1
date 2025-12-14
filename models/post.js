const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require("./comment.js");
const User = require("./user.js");

const postSchema = new Schema({
  image: {
    type: String,
    required: true, // image URL
  },

  caption: {
    type: String,
    trim: true,
    maxlength: 1000,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  dislikes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
