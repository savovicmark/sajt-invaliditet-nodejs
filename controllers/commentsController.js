const CommentModel = require('../models/commentModel');

exports.postComment = async (req, res) => {
    const text = req.body.text.trim();
    try {
        const newComment = new CommentModel({text, "user": req.body.userId, "article": req.body.articleId});
        const savedComment = await newComment.save();
        //=================================
        const populateComm = await CommentModel.findById(savedComment._id).populate({
            path: 'user',
            select: 'username _id' 
        }).populate({
            path: 'replies.user',
            model: 'User',
            select: 'username _id'
        });
        res.status(200).json(populateComm);
    }
   catch(err) {
       res.status(400).json({
           msg: "Comment post failed",
           err: err
       })
   }
}
//===================================================================================

exports.getCommentsByArticleId = async (req, res) => {
    const articleId = req.params.articleId;
    console.log(articleId);
    try {
        const comments = await CommentModel.find({"article": articleId}).populate({
            path: 'user',
            select: 'username _id' 
        }).populate({
            path: 'replies.user',
            model: 'User',
            select: 'username _id'
        });
        res.status(200).json(comments);
    }
    catch(err) {
        res.status(400).json({
            msg: "Comment post failed",
            err: err
        })
    }
}

//==================================================================================

exports.postReplyToComment = async (req, res) => {
    const commentId = req.body.commentId;
    const replyText = req.body.text.trim();
    const userId = req.body.userId;
    try {
        const updatedComm = await CommentModel.findByIdAndUpdate(commentId, {
            $push: {
                "replies": {
                    "text": replyText,
                    "user": userId
                }
            }
        }, {new: true});
        //====novo
        const comment = await CommentModel.findById(commentId).populate({
            path: 'user',
            select: 'username _id' 
        }).populate({
            path: 'replies.user',
            model: 'User',
            select: 'username _id'
        });
        res.status(200).json(comment);
    }
    catch(err) {
        res.status(400).json({
            msg: "Posting reply failed",
            err: err
        })
    }
}

//=================================================================================================

exports.deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    // console.log(commentId);
    try {
        const comment = await CommentModel.findByIdAndDelete(commentId);
        res.status(200).json(comment)
    }
    catch(err) {
        res.status(400).json({
            msg: "Deleting comment failed",
            err: err
        })
    }
}

//================================================================================================

exports.deleteReply = async (req, res) => {
    const replyId = req.params.replyId;
    const commentId = req.params.commentId;
    try {
        const comment = await CommentModel.findById(commentId);
        comment.replies.id(replyId).remove();
        const savedComment = await comment.save();
        res.status(200).json(savedComment);
    }
    catch(err) {
        res.status(400).json({
            msg: "Deleting reply failed",
            err: err
        })
    }
}