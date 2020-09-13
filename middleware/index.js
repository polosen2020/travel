//all middlewares



var middlewareObj ={};

var Dreamplace = require("../models/dreamplace");
var Comment    = require("../models/comment");

middlewareObj.checkOwnership = function(req,res,next){

if(req.isAuthenticated())
		{
			Dreamplace.findById(req.params.id,function(err,founddreamplace){
			if(err)
				{cd 
					req.flash("error","You request is invalid!");
					res.redirect("back");
				}else{
					if(founddreamplace.author.id.equals(req.user._id)){
						next();
					}else{
						req.flash("You don't have permission to do that!");
						res.redirect("back");
					}
					
				}
		});
			
		}else{
			res.flash("error","You need to be logged in ")
			res.redirect("back");
		}
	
}


middlewareObj.checkCommentOwnership = function(req,res,next){
	if(req.isAuthenticated())
		{
			Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err)
				{
					console.log(err);
					res.redirect("back");
				}else{
					if(foundComment.author.id.equals(req.user._id)){
						next();
					}else{
						req.flash("error","You don't have the permission");
						res.redirect("back");
					}
					
				}
		});
			
		}else{
			req.flash("error","You need to be logged in!");
			res.redirect("back");
		}
}
 middlewareObj.isloggedin = function(req,res,next){
	 if(req.isAuthenticated()){
	   		return next();
	   };
	 
	req.flash("error","You need to be logged in!") 
	res.redirect("/login");
 }

module.exports = middlewareObj;