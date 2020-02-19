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