var express = require("express"),
	app     = express(),
bodyparser  = require("body-parser"),
methodOverride = require("method-override"),	
passport    = require("passport"),
LocalStrategy=require("passport-local"),
 mongoose   = require("mongoose"),
flash       = require("connect-flash"),
Dreamplace  = require("./models/dreamplace"),
Comment     =require("./models/comment"),
seedDB      = require("./seeds"),
User        = require("./models/user")	;


var commentRoutes = require("./routes/comments");
var dreamplaceRoutes = require("./routes/dreamplaces");
var authRoutes = require("./routes/auth");

mongoose.connect("mongodb://localhost/database", {useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false});
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());
//seedDB();



//PASSPORT SETUP
app.use(require("express-session")({
	secret: "secret message",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error= req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
app.use("/",authRoutes);
app.use("/dreamplaces",dreamplaceRoutes);
app.use("/dreamplaces/:id/comments",commentRoutes);

app.listen(3000,function(){
	console.log(" server has started");
});


