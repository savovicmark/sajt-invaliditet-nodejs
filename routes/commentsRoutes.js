const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentsController');

router
    .route('/reply')
    .post(commentController.postReplyToComment)
router
    .route('/:articleId')
    .get(commentController.getCommentsByArticleId)
router
    .route('/')
    .post(commentController.postComment)

module.exports = router;