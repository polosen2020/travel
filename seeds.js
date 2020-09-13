var mongoose = require("mongoose");
var Dreamplace = require("./models/dreamplace");
var Comment    = require("./models/comment");

//add data
var data =[
	{
		name :"Toronto, Canada",
		image:"https://www.seetorontonow.com/wp-content/uploads/2020/04/toronto-skyline-looking-west-idil-mohamed-rU_3k0BINtQ-unsplash-hub-tile.jpg",
		description :"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name :"Dubai",
		image:"https://c8.alamy.com/comp/KB3K8F/uae-dubai-downtown-dubai-downtown-hi-rise-buildings-elevated-view-KB3K8F.jpg",
		description :"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	},
	{
		name :"Igypt",
		image:"https://s27363.pcdn.co/wp-content/uploads/2020/01/10-Day-Egypt-Itinerary.jpg.optimal.jpg",
		description :"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
	}
	
	
]

function seedDB(){
	//deleted data
	Dreamplace.deleteMany({},function(err){
	if(err)
		console.log(err);
	console.log("removed data");
		//data added
	data.forEach(function(seed){
		Dreamplace.create(seed,function(err,dreamplace){
			if(err){
				console.log(err);
			}else{
				console.log("added dreamplace");
				Comment.create(
					{text:"This place is great. but i am too poor to go there",
					 author:"Pakhi Roy"
					},function(err,comment){
						if(err)
							{
								console.log(err);
							}
						else{
							dreamplace.comments.push(comment);
							dreamplace.save();
							console.log("created new comment");
						}
						
					})
			}
		})
	})
});

	
	
	
}

module.exports = seedDB;
