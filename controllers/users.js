const User = require("../models/user");
const Post = require("../models/post");

module.exports.renderSignupForm = (req, res)=> {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req, res) => {
    try{
    let {username, email, password} = req.body;
    let newUser = new User({email, username });
    let registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }else{
        req.flash("success", "Welcome to task-1");
        res.redirect("/posts");
      }
    });   
    }catch(e){
        req.flash("error", e.message );
        res.redirect("/signup");
    }
};
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req, res) => {
     req.flash("success", "Welcome back to Task1.");
     let redirectUrl = res.locals.redirectUrl || "/posts";
    
     res.redirect(redirectUrl);
    
};

module.exports.logout = (req, res, next) => {
    req.logout( (err) => {
        if(err){
        return  next();
        }else{
            req.flash("success", "You are logged out now.");
            res.redirect("/login");
        }
})
};

module.exports.showAllUsers = async (req, res) => {
  const currentUser = req.user;

  
  const users = await User.find({ _id: { $ne: currentUser._id } });

 
  const usersWithPosts = await Promise.all(
    users.map(async (user) => {
      const posts = await Post.find({ author: user._id });
      return {
        user,
        postCount: posts.length,
        latestPost: posts[0] || null, 
      };
    })
  );

  res.render("users/allUsers.ejs", { usersWithPosts, currentUser });
};

module.exports.followUser = async (req, res) => {
    const currentUser = req.user;      // Logged-in user
    const { id } = req.params;         // User to follow

    if (currentUser._id.equals(id)) {
        req.flash("error", "You cannot follow yourself.");
        return res.redirect("/all");
    }

    const userToFollow = await User.findById(id);
    if (!userToFollow) {
        req.flash("error", "User not found.");
        return res.redirect("/all");
    }

    // Add to following/followers if not already
    if (!currentUser.following.includes(userToFollow._id)) {
        currentUser.following.push(userToFollow._id);
        await currentUser.save();
    }

    if (!userToFollow.followers.includes(currentUser._id)) {
        userToFollow.followers.push(currentUser._id);
        await userToFollow.save();
    }

    req.flash("success", `You are now following ${userToFollow.username}`);
    res.redirect("/all");
}


module.exports.unfollowUser = async (req, res) => {
    const currentUser = req.user;      // Logged-in user
    const { id } = req.params;         // User to unfollow

    if (currentUser._id.equals(id)) {
        req.flash("error", "You cannot unfollow yourself.");
        return res.redirect("/all");
    }

    const userToUnfollow = await User.findById(id);
    if (!userToUnfollow) {
        req.flash("error", "User not found.");
        return res.redirect("/all");
    }

    // Remove from following/followers
    currentUser.following = currentUser.following.filter(
        userId => !userId.equals(userToUnfollow._id)
    );
    await currentUser.save();

    userToUnfollow.followers = userToUnfollow.followers.filter(
        userId => !userId.equals(currentUser._id)
    );
    await userToUnfollow.save();

    req.flash("success", `You unfollowed ${userToUnfollow.username}`);
    res.redirect("/all");
}

// module.exports.showFollowers = async (req, res) => {
//     const user = await User.findById(req.user._id).populate("followers", "username");
//     res.render("users/followers", { user, followers: user.followers });
// }

// module.exports.showFollowing = async (req, res) => {
//     const user = await User.findById(req.user._id).populate("following", "username");
//     res.render("users/following", { user, following: user.following });

// }

// module.exports.showFollowers = async (req, res) => {
//   const user = await User.findById(req.user._id)
//     .populate("followers")
//     .populate("following");

//   res.render("users/followers", {
//     followers: user.followers,
//     following: user.following.map(u => u._id.toString())
//   });
// };




module.exports.showFollowers = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("followers")
    .populate("following");

  res.render("users/followers", {
    followers: user.followers,
    followingIds: user.following.map(u => u._id.toString())
  });
};

module.exports.showFollowing = async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("following");

  res.render("users/following", {
    following: user.following
  });
};
