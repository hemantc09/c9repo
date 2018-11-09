var express = require("express");
var router =  express.Router();
var passport  =  require("passport");
var User =  require("../models/user");

//root route '/'
router.get("/",function(req,res){
    res.render("landing");
});





//==============================
// - AUTH ROUTES -
//==============================

//show register form route

router.get("/register",function(req, res) {
    //passing the page variable for the nav-bar menu. See the header.ejs file for details.
    res.render("register",{page: 'register'});
})
    
//handle sign up locoic
router.post("/register",function(req, res) {
   //res.send("Signing you up");
   var newUser = new User({username: req.body.username});
   
   User.register(newUser, req.body.password, function(err, user){
      if(err){
          console.log(err);
          //add flash message here if register went wrong
          req.flash("error",err.message);
          //flash message doesnt work with the res.render. So we are using the res.redirect
          return res.redirect("/register");
          
        //   return res.render("register");
      } 
      //if the register work then we are login that user 
      //using below authenticate
      
       passport.authenticate("local")(req,res, function(){
           req.flash("success","Welcome to campground! " + user.username);
            //once you sign and success redirect user to secrete page
            res.redirect("/campgrounds");
        });
   });
   
   //if the same is register again it will redirect to the register page 
});

// show login form
router.get("/login", function(req, res) {
    //handle the flash error
    
    // req.flash("success","")
    //error key is important has to be same name mentioned in the middleware index.js file
    //passing the page variable for the nav-bar menu. see the header.ejs for more details. 
     res.render("login",{page: 'login'});
})

//handling login logic
//using the middle ware passport.authenitcate for local login
// this is the pattern app.post("/login", middleware, callback)
//if the register work created in register using below authenticate to login that user
router.post("/login", passport.authenticate("local", 
//this will run first
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    
    //you can get rid for call back it doesnt do anything but just in case
    }), function(req,res){
        
        //================= added code below and remove the err
        
    // if(err){ 
    //     console.log("error");
    //     res.redirect("/login");
        
    // }else {
    //     console.log("Success login!!");
    //     res.redirect("/campgrounds");
    // }
    
    //=================
    
});

// add logout route
router.get("/logout", function(req, res) {
    req.logout();
    //flash message "error" should be same name key and value = "message"
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
})



module.exports = router;