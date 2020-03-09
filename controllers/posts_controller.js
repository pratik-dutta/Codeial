const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
<<<<<<< HEAD
    
        if (req.xhr){
=======
        
        if (req.xhr){
            // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
>>>>>>> e24c041ff8a52f4443aca7cbdc29d6a790281b59
            post = await post.populate('user', 'name').execPopulate();

            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }

        req.flash('success', 'Post published!');


        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        // added this to view the error on console as well
        console.log(err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

<<<<<<< HEAD
=======

>>>>>>> e24c041ff8a52f4443aca7cbdc29d6a790281b59
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
<<<<<<< HEAD

        console.log('Error', err);
        return res.redirect('back')
=======
        return res.redirect('back');
>>>>>>> e24c041ff8a52f4443aca7cbdc29d6a790281b59
    }
    
}