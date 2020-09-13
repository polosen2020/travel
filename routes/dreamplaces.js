var express = require("express");
var router  = express.Router();
var Dreamplace  = require("../models/dreamplace");
var middleware = require("../middleware");
//create

router.get("/",function(req,res)
	   {
	Dreamplace.find({},function(err,allDreamplaces){
		
		if(err)
			console.log(err);
		else
			{
				res.render("dreamplaces/index",{dreamplaces:allDreamplaces});
			}
	});
	
	
});

router.post("/",middleware.isloggedin,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var description =req.body.description;
	var author = {
		id : req.user._id,
		username: req.user.username
	}
	var newPlace = {name:name, image: image, description:description,author:author};
	Dreamplace.create(newPlace,function(err,addednew)
	{
		if(err){
			console.log(err);
		}	
		else{
			res.redirect("/dreamplaces")
		}
	});
	
});

//addnew
router.get("/addnew",middleware.isloggedin,function(req,res){
	res.render("dreamplaces/new");
});
//show descriptions
router.get("/:id",function(req,res){
	Dreamplace.findById(req.params.id).populate("comments").exec(function(err,founddreamplace){
		if(err)
			console.log(err);
		else
			{
			//console.log(founddreamplace);
			res.render("dreamplaces/shows",{dreamplace:founddreamplace});	
			}
		
	});
	
});
//edit
router.get("/:id/edit",middleware.checkOwnership,function(req,res){

			Dreamplace.findById(req.params.id,function(err,founddreamplace){
				res.render("dreamplaces/edit",{dreamplace:founddreamplace});
		});
	
	
	
});
router.put("/:id",middleware.checkOwnership,function(req,res){
	Dreamplace.findByIdAndUpdate(req.params.id,req.body.dreamplace,function(err,updatedDreamplace){
		if(err){
			console.log(err);
			res.redirect("/dreamplaces");
		}else{
			res.redirect("/dreamplaces/" +req.params.id);
		}
		
	});
});
//destroy
router.delete("/:id",middleware.checkOwnership,function(req,res){
	Dreamplace.findByIdAndRemove(req.params.id,function(err){
		if(err)
			res.redirect("/dreamplaces");
		else{
			req.flash("success","Dreamplace deleted");
			res.redirect("/dreamplaces");
		}
	});
});
// function isloggedin(req,res,next){
// 	if(req.isAuthenticated()){
// 	   		return next();
// 	   };
// 	res.redi

// rect("/login");
// }
// function checkOwnership(req,res,next){
// 	if(req.isAuthenticated())
// 		{
// 			Dreamplace.findById(req.params.id,function(err,founddreamplace){
// 			if(err)
// 				{
// 					console.log(err);
// 					res.redirect("back");
// 				}else{
// 					if(founddreamplace.author.id.equals(req.user._id)){
// 						next();
// 					}else{
// 						res.redirect("back");
// 					}
					
// 				}
// 		});
			
// 		}else{
// 			res.redirect("back");
// 		}
	
	
	
	
	
	
	
// }
module.exports = router;



