const Comment = require("../models/comment");
const Post = require("../models/post");


//with async

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            req.flash('success', 'Comment published!');


            res.redirect('/');
        }
    }catch(err){
        console.log('Error', err);
        return;
    }
    
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);

        if (comment.user == req.user.id){

            let postId = comment.post;

            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            req.flash('success', 'Comment deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        console.log('Error', err);
        return;
    }
    
}


//without async

// module.exports.create = function(req, res){
//     console.log(req.body);
//     Post.findById(req.body.post, function(err, post){
//         //handle error
//         if(err){
//             console.log("error in comments", err);
//             return;
//         }
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 //handle error
//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect("/");
//             });
//         }
//     });
// }


// module.exports.destroy = function(req, res){
//     Comment.findById(req.params.id, function(err, comment){
//         if (comment.user == req.user.id){

//             let postId = comment.post;

//             comment.remove();

//             Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}}, function(err, post){
//                 return res.redirect('back');
//             })
//         }else{
//             return res.redirect('back');
//         }
//     });
// }