var express = require("express");
//it will merge the prams from teh campground and the comments together toaccess the id and campgrunds and comment etc. 

var router = express.Router({mergeParams: true});
//note down the two dots. because we are inside the router directory
// and we are going back
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");



//==============================
// - COMMENTS ROUTE Below -
//==============================


//comments new

//note: if the user is logged in then it will be able to add a comment
//that why we are adding middle ware isLoggedIn function below

router.get("/new", middleware.isLoggedIn, function(req, res) {
    //find campground by id
    console.log(req.params.id);
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            //we created a new route in the comments folder
            res.render("comments/new",{campground: campground});
        }
    })
});

//comments create

//Post route where we can submit the 
//prevent anyone to add comment unless they logged in
router.post("/", middleware.isLoggedIn, function(req,res){
    //lookup campgrounds using id
    Campground.findById(req.params.id,function(err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment,function(err,comment){
              if(err){
                  // add a flash message here
                  req.flash("error","Something went wrong!");
                  console.log(err);
              } else{
                  console.log(req.body.comment.name +" "+ req.body.comment.author);
                  //add username and id to comment 
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                   
                  //because we have used the middle ware the only way this code get 
                  //run if the suer is looged in.
                  //thats why we can use the "req.user" to get the user data
                   
                    //console.log("New comment user name: ",req.user.username);
                    
                  //save comment
                  comment.save();
                  //push to comment
                  campground.comments.push(comment);
                  //save the in to the entore campground
                  campground.save();
                  req.flash("success","Successfully comment");
                  res.redirect('/campgrounds/'+campground._id);
                //   console.log(campground._id)
              }
               
            });
            //console.log(req.body.comment);
          
            
            //Comments
        }
    });
    
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
});

// COMMENT EDIT ROUTE

router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res) {
    // //  console.log("campground_id route = ", req.params.id);
    var campground_id = req.params.id;
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) {
                // res.send("error 1");
                 res.redirect("back");
             } 
            else {
                // console.log("campground_id else = ", req.params.id);
                res.render("comments/edit",{campground_id: campground_id, comment: foundComment});
                //res.send("error");
            }
     });
});



// COMMENT UPDATE need a PUT request for editing comment - One above and this one  [get and put ]
router.put("/:comment_id",middleware.checkCommentOwnership,  function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err) {
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);  //start here
        }
    });
});



//DELETE/Destroy COMMENT ROUTE

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
        //findById
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        
        if(err){
            res.redirect("back");    
        }else {
            req.flash("success","Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    
}); 




module.exports = router;
