const User = require("../models/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render("users", {
            title: "User Profile",
            profile_user: user,
        });
    });
    
};

module.exports.update = async function(req, res){
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
    //         req.flash('success', 'Updated!');
    //         return res.redirect('back');
    //     });
    // }else{
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    // }
    if(req.user.id == req.params.id){
        try{
            let user = await User.findByIdAndUpdate(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    cosole.log("multer Error");
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    
                    //ths will remove without checking if file is present and throws error if not
                    // if(user.avatar){
                    //     fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                    // }

                     //this will remove with checking if file is present or not
                    if(fs.existsSync(path.join(__dirname, "..", user.avatar))){
                        if(user.avatar){
                            fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                        }
                    }


                    //this saves the avatar in the user
                    user.avatar = User.avatarPath + "/" + req.file.filename;
                }
                user.save();
                return res.redirect("back");
            });
        }catch(err){
            req.flash("error", err);
            return res.redirect("back");
        }
    }else{
        req.flash('error', 'Unauthorized!');
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
        req.flash('error', 'Passwords do not match');
        return res.redirect("back");
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            req.flash('error', err); 
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    req.flash('error', err);
                    return;
                }

                return res.redirect("/users/signin");
            });
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect("back");
        }
    });
}


module.exports.createSessions = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect("/");
}

module.exports.destroySession = function(req, res){
    // request is getting logout function through passport
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect("/");
}

