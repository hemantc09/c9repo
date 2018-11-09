var mongoose = require("mongoose");


//create schema

var commentSchema =  mongoose.Schema({
    text: String,
    //id and username of that user to save for the comment to the respective user. 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            //refers to the model we are refere to the ObjectId
            ref: "User"
        },
         username: String
    }
    // author: String
});

//in below statement comment is a reference for the schema and thats what we are using when 
//it require in the seeds.js file
//basically we are exporting the comment schema and using as "Comment" in seeds.js

module.exports = mongoose.model("Comment",commentSchema);