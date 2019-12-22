const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentsController');

router
    .route('/getcomments/:articleId')
    .get(commentController.getCommentsByArticleId)
router
    .route('/reply')
    .post(commentController.postReplyToComment)

router
    .route('/reply/:replyId/:commentId')
    .delete(commentController.deleteReply)

router
    .route('/comment/:commentId')
    .delete(commentController.deleteComment)

router
    .route('/')
    .post(commentController.postComment)



module.exports = router;