const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: "User" }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: "User" }],
});
userSchema.plugin(passportLocalMongoose, { usernameField: 'username' });
module.exports = mongoose.model("User", userSchema);