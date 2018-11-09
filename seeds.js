var mongoose =  require("mongoose");
var Campground  = require("./models/campground");
var Comment     = require("./models/comment");

var data = [
    {
        name: "Campground near the ocen",
        image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8c8fc5a023e80b24f9fa26451a3c52cc&auto=format&fit=crop&w=1100&q=60",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Campground near the cold weather",
        image: "https://images.unsplash.com/photo-1530102900583-143a3be5d43f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=be72236f0cb67315dceb05d2dfb94710&auto=format&fit=crop&w=934&q=80",
        description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Campground near the warm weather",
        image: "https://images.unsplash.com/photo-1464747108843-cec40b4f0157?ixlib=rb-0.3.5&s=87d6fa1b0ee83408e603c9fb996654e4&auto=format&fit=crop&w=1051&q=80",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name: "Campground in Winter",
        image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=601fcba3c5d7ddec0c8f2690e8638461&auto=format&fit=crop&w=967&q=80",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    }
    
];
//remove all the campgrounds
function seedDB(){
    Campground.remove({},function(err){
        
       if(err){
           console.log(err);
       }else
       {
         console.log("removed campgrounds");
         
        //add few campgrounds from the seeds.js data
        data.forEach(function(seed){
            Campground.create(seed,function(err,campgroundData){
                if(err){
                    console.log(err);
                }else{
                    console.log("Added a campground");
                    
                    //create a comment
                    Comment.create(
                        {
                            text:"This place is awesome!!!",
                            author: "Hemant"
                        },function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                //push the comment
                                //comments property coming from the campground.js
                                campgroundData.comments.push(comment);
                                //save the comment
                                campgroundData.save();
                                console.log("comment created");
                                //console.log("created new comment:"+ comment);
                            }
                        });
                }
            });    
        })
        
       }
    });
    //add a few comments
}


module.exports = seedDB;
