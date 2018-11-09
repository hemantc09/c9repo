var express             = require("express"),
        app             = express(),
        bodyparser      = require("body-parser"),
        mongoose        = require("mongoose"),
        //using for the flash messages
        flash           = require("connect-flash"),
        //passport and local we are using for the authentication
        passport        = require("passport"),
        LocalStrategy   = require("passport-local"),
        methodOverride  = require("method-override"),
        //below are the models - Campground variable used below for queries and
        //./module/campground coming from the campground.js export
        Campground      = require("./models/campground"),
        Comment         = require("./models/comment"),
        User            = require("./models/user")
        //sedsDB is used to load the data initially with comments and all just to work with test data
        seedDB          = require("./seeds");


//requiring routes
//for the router functionality
var commentsRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");
         


//this the soluton for the DeprecationWarning when you run the node app.js 
mongoose.connect("mongodb://localhost:27017/yelp_app_v13", { useNewUrlParser: true });
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//using for flash messages
app.use(flash());
console.log(__dirname);

//call the seedDB() database
// seedDB();


//PASSPORT configuration

app.use(require("express-session")({
    secret: "Once again I am the front end developer",
    //resave and saveUninitialized has to add
    resave: false,
    saveUninitialized: false
}));

//initialize passport
//tell express to use the passport
app.use(passport.initialize());
app.use(passport.session());

//User.authenticate() method comes from the User model passport local mongoose
//below is the used by middle ware for login local functionality
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//below logic is to pass the current user to every single route defined below
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    // and after that run the next code its important to add next();
    next();
});


//router functionality

//you are here
app.use("/", indexRoutes);
//campgrounds is the common so we are  routes so we are going to add here 
app.use("/campgrounds", campgroundRoutes);
///campgrounds/:id/comments is common in all routes so it get appended first for all routes
app.use("/campgrounds/:id/comments", commentsRoutes);


app.listen(process.env.PORT,process.env.IP, function(){
   console.log("Yelp camp server started"); 
});