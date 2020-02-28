const Post = require("../models/post");

module.exports.home = function(req, res){
    
    //to check the cookies made in chrome
    // console.log(req.cookies);

    //to set the cookie
    // res.cookie("user_id", 25);
    

    //it does not populate the user
    // Post.find({}, function(err, posts){
    //     if(err){
    //         console.log("Error in fetching Posts");
    //         return;
    //     }
    //     return res.render("home", {
    //         title: "Home",
    //         posts: posts,
            
    //     });
    // });

    //it populate the user
    Post.find({}).populate("user").exec(function(err, posts){
            if(err){
                console.log("Error in fetching Posts");
                return;
            }
            return res.render("home", {
                title: "Home",
                posts: posts,
                
            });
        }
    );

    
}
