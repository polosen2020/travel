var express     = require("express");
var router      = express.Router({mergeParams:true});
var mongoose    = require("mongoose");
var Dreamplace  = require("../models/dreamplace");
var Comment     = require("../models/comment");
var middleware = require("../middleware");


//==========================================//
//comments routes
router.get("/new",middleware.isloggedin, function(req,res){
	Dreamplace.findById(req.params.id,function(err,dreamplace){
		if(err)
			console.log(err);
		else
			res.render("comments/new",{dreamplace:dreamplace});	
	});
	
});
router.post("/",middleware.isloggedin,function(req,res){
	Dreamplace.findById(req.params.id,function(err,dreamplace)
	{
		if(err)
			{
				console.log(err);
				res.redirect("/dreamplaces")
			}
		else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					req.flash("error","Something went wrong!");
				}
				else{
					//save name and id
					comment.author.id  = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					
					dreamplace.comments.push(comment);
					dreamplace.save();
					req.flash("success","Sucessfully added comment");
					res.redirect("/dreamplaces/"+ dreamplace._id);
				}
			});
		}
	});
});
//comments edit
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err)
			{
				console.log(err);
				res.redirect("back");
			}else{
				res.render("comments/edit",{dreamplace_id:req.params.id ,comment:foundComment});
			}
	})
	
});
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updateComment){
		if(err)
			{
				res.redirect("back");
			}
		else{
			res.redirect("/dreamplaces/"+req.params.id);
		}
	})
	
});
//comments destroy
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			console.log(err);
			res.redirect("back");
		}
		else{
			req.flash("success","Comment Deleted!");
			res.redirect("/dreamplaces/" + req.params.id);
		}
	})
})
// function isloggedin(req,res,next){
// 	if(req.isAuthenticated()){
// 	   		return next();
// 	   };
// 	res.redirect("/login");
// }

// function checkCommentOwnership(req,res,next){
// 	if(req.isAuthenticated())
// 		{
// 			Comment.findById(req.params.comment_id,function(err,foundComment){
// 			if(err)
// 				{
// 					console.log(err);
// 					res.redirect("back");
// 				}else{
// 					if(foundComment.author.id.equals(req.user._id)){
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