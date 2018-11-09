// all middlware goes here
var middlewareObj = {};
var Campground = require("../models/campground");
var Comment = require("../models/comment");


//one way of doing this as follow create individual middle ware function 
// check campground ownership
middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    //is user logged in
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                //send user back
                res.redirect("back");
            } else {
                //does user own campground??
                
                console.log("here- " + foundCampground.author.id); //this is mongoose object see below console log as well
                console.log("here au id" + req.user._id); //this is string so both not same even they look same. be carefull here
                //campare id found with current login user id
                if(foundCampground.author.id.equals(req.user._id)) {
                    //res.render("campgrounds/edit",{campground: foundCampground});
                    next();
                }else {
                    // res.send("you do not have permission");
                    res.redirect("back")
                }
                
            }
        });
    } else {
        req.flash("error","You need to be Logged In to do that!");
        // console.log("you need to login");
        // res.send("you need to login");
        res.redirect("back");
    }
}
    

// check comment ownership
middlewareObj.checkCommentOwnership = function(req, res, next) {
    //is user logged in
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                //send user back
                res.redirect("back");
            } else {
                //does user own comment??
                
                //console.log("here- " + foundComment.author.id); //this is mongoose object see below console log as well
                //console.log("here au id" + req.user._id); //this is string so both not same even they look same. be carefull here
                
                //campare id found with current login user id
                if(foundComment.author.id.equals(req.user._id)) {
                    //res.render("campgrounds/edit",{campground: foundCampground});
                    next();
                }else {
                    // res.send("you do not have permission");
                     req.flash("error","You need to be logged in to do that!");
                    res.redirect("back")
                }
            }
        });
    } else {
        req.flash("error","You dont have permission to do that!");
        // console.log("you need to login");
        // res.send("you need to login");
        res.redirect("back");
    }

}


//middleware
//is user logged in 

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    //add the flash message code here {"key", "value"}
    req.flash("error", "You need to be logged In to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;