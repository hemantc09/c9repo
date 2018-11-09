var express = require("express");
var router =  express.Router();
var Campground = require("../models/campground");
//this will autimatically use the "index.js from the middlware directory. 
//No need to write index.js in the below path."
var middleware = require("../middleware");


//INDEX ROUTE - show all campgrounds
router.get("/",function(req,res){
   //  display object user name if the usr is looged in 
   // console.log(req.user);
    
    //get all the campgrounds from the db(campgrounds collcetion) by finding it
    Campground.find({},function(err,allcampgrounds){
        if(err){
            console.log(err);
        }else{
            //then render all the campgrounds
            res.render("campgrounds/index",{campgrounds:allcampgrounds, page: 'campgrounds'});
        }
    });
});



//CREATE  Route- Add new campogrund to Database
//FYI: middleware.checkCampgroundOwnership coming from the middle ware directory 
router.post("/",middleware.isLoggedIn,function(req,res){
    //res.send("You hit the post route");
    //get data from form and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    //e.g. name attribute set in the form
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    //following data is created and name,image and desc and author is going to save in DB
    var newCampground = {name:name, price: price, image:image, description: desc, author: author};
    
    //get the currenly logged in user
    console.log("Current logged in user:", req.user);
    
    
    
    //create a new campground and save to db`
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log("newly created campground: ", newlyCreated);
            //after adding new redirect to campgrounds to show all including new one
            res.redirect("/campgrounds");
           
        }
    });
});


//NEW - Show route form to create new Campground - make sure to new route first before the id route.. just a note
router.get("/new",middleware.isLoggedIn, function(req, res) {
    // campgrounds folder and new file
    res.render("campgrounds/new");    
});


//SHOW - show the more info about invdividual campground
router.get("/:id",function(req, res) {
    //find the campground with provided id
    //populate the comments 
    //.exec is going to execute the query
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundCampground);
            //render show template with the "campground" - which is a foundCampground reference
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
    
});


//EDIT CAMPGROUND ROUTE

router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCampground){
      
    //add flash message here if needed
    
    //console.log("here- " + foundCampground.author.id); //this is mongoose object see below console log as well
    //console.log("here au id" + req.user._id); //this is string so both not same even they look same. be carefull here
    //campare id found with current login user id
        res.render("campgrounds/edit",{campground: foundCampground});
    });
    
    //otherwuser, redirect
    //if not redirect
    //   res.render("edit");
});

// UPDATE CAMPGROUND ROUTE

router.put("/:id",middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campgriunds
    // Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err,updatedCampground){
     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            //res.redirect("/campgrounds");
             res.redirect("/campgrounds");
        }else{
            //redirect somewhere (show page)
             res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//DESTROY/Delete campground 


router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res){
   //res.send("you are deleting "); 
   Campground.findByIdAndRemove(req.params.id, function(err) {
       if(err){
           res.redirect("/campgrounds");
       }else {
           res.redirect("/campgrounds");
       }
   });
});




// check campground ownership


 module.exports = router;