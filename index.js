require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const ejs = require("ejs");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const User = require("./models/user.js");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const session = require("express-session");
//const User = require("./models/user");

//const MongoStore = require('connect-mongo');
//const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');
const MongoStoreClass = MongoStore.default || MongoStore;

app.set("view engine", "ejs");
app.use(express.urlencoded( {extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

//routes
const userRouter = require("./routes/user.js");
const profileRouter = require("./routes/profile.js");
const postRouter = require("./routes/post.js");
const commentRouter = require("./routes/comment.js");

const dbUrl = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(dbUrl);
}

main().then(()=>{
console.log(" Connected to MongoDB");
}).catch((err) => {
console.log(err);
})



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const store = MongoStoreClass.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized :true,
  cookie: {
    expires: Date.now()  + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly: true,

  },
};

app.use(session(sessionOptions));
app.use(flash());


store.on("error", (err) => {
  console.log("Error in the mongo session store", err);
});








app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user || null;
  console.log(res.locals.success);
  next();
})

app.get("/", (req, res) => {
    res.redirect("/posts");
});

app.use("/", userRouter);
app.use("/profile", profileRouter);
app.use("/posts", postRouter);
//app.use("/posts/:id/comments", commentRouter);

app.all("/*splat", (req, res, next) => {
     next(new ExpressError(404, "Page not found!!"));
});




app.use((err, req, res,next) => {
    let {statusCode = 500, message ="something went wrong "} = err;
    res.status(statusCode).render("error.ejs", {message});
    //res.status(statusCode).send(message);
});
