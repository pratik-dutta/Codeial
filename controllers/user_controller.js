const User = require("../models/user");

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render("users", {
            title: "User Profile",
            profile_user: user,
        });
    });
    
};

module.exports.update = function(req, res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('Unauthorized');
    }
}



//rendeing post 
module.exports.post = function(req, res){
    return res.render("users", {
        title: "User Post"
    });
};
//rendeing sigup
module.exports.signup = function(req, res){
    //if user is already sign in
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render("signup", {
        title: "User SignUp"
        
    });
};
//rendeing sigin 
module.exports.signin = function(req, res){
    //if user is already sign in
    if(req.isAuthenticated()){
        return res.redirect("/users/profile");
    }
    return res.render("signin", {
        title: "User SignIn"
    });
};

//get the data
module.exports.create = function(req, res){
    console.log("create");
    if(req.body.password != req.body.confirm_password){
        return res.redirect("back");
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log("Error finding while user Sign up");
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log("Error finding while user Sign up");
                    return;
                }

                return res.redirect("/users/signin");
            });
        }else{
            return res.redirect("back");
        }
    });
}


module.exports.createSessions = function(req, res){
    return res.redirect("/");
}

module.exports.destroySession = function(req, res){
    // request is getting logout function through passport
    req.logout();
    return res.redirect("/");
}

