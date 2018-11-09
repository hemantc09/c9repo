var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

//passportLocalMongoose adds the metohds we gonna use for the  authentication

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);