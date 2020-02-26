module.exports.home = function(req, res){
    
    //to check the cookies made in chrome
    // console.log(req.cookies);

    //to set the cookie
    // res.cookie("user_id", 25);
    
    return res.render("home", {
        title: "Home"
    });
}
