const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

router
    .route('/')
    .post(articleController.postArticle)
    .get(articleController.getAllArticles)
    .patch(articleController.updateArticleById)

router
    .route('/:articleId')
    .get(articleController.getArticleById)
    .delete(articleController.deleteArticleById)
module.exports = router;