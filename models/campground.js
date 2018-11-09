var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   author: {
         id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
         },
         username: String
   },
   comments:[
      {
         //association of data with comments using ids
         type: mongoose.Schema.Types.ObjectId,
         ref:"Comment"
      }
   ]
});

//This is the export of module. Alternate line for below line
//basically we are exporting the campground  schema and using as "Campground" in seeds.js
module.exports = mongoose.model("Campground",campgroundSchema);

// make a model - we wrote the export line above to replace the below line
//var Campground = mongoose.model("Campground", campgroundSchema);