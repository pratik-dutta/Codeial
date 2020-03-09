const Post = require("../models/post");
const User = require("../models/user");

//using Async
module.exports.home = async function(req, res){

    try{
         // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({});

        return res.render('home', {
            title: "Home",
            posts:  posts,
            all_users: users
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}


//causing callback hell
// module.exports.home = function(req, res){
    
//     //to check the cookies made in chrome
//     // console.log(req.cookies);

//     //to set the cookie
//     // res.cookie("user_id", 25);
    

//     //it does not populate the user
//     // Post.find({}, function(err, posts){
//     //     if(err){
//     //         console.log("Error in fetching Posts");
//     //         return;
//     //     }
//     //     return res.render("home", {
//     //         title: "Home",
//     //         posts: posts,
            
//     //     });
//     // });

//     //it populate the user
//     // Post.find({}).populate("user").exec(function(err, posts){
//     //         if(err){
//     //             console.log("Error in fetching Posts");
//     //             return;
//     //         }
//     //         return res.render("home", {
//     //             title: "Home",
//     //             posts: posts,
                
//     //         });
//     //     }
//     // );

//     // it populate the user as well as the comments and it's user

//     Post.find({})
//     .populate("user")
//     .populate({
//         path: "comments",
//         populate: {
//             path: "user"
//         }
//     })
//     .exec(function(err, posts){
//         if(err){
//             console.log("Error in fetching Posts");
//             return;
//         }

//         User.find({}, function(err, users){
//             return res.render("home", {
//                 title: "Home",
//                 posts: posts,
//                 all_users: users,
//             });
//         });

        
//     }
// );

    
// }
