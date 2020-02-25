module.exports.profile = function(req, res){
    return res.render("users", {
        title: "User Profile"
    });
};

module.exports.post = function(req, res){
    return res.render("users", {
        title: "User Post"
    });
};

module.exports.signup = function(req, res){
    return res.render("signup", {
        title: "User SignUp"
        
    });
};

module.exports.signin = function(req, res){
    return res.render("signin", {
        title: "User SignIn"
    });
};