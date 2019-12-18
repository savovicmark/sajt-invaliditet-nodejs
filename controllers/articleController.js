const ArticleModel = require('../models/articleModel');

exports.postArticle = async (req, res) => {
    const naslov = req.body.naslov.trim();
    const text = req.body.text.trim();
    const type = req.body.type.trim();
    const image = req.body.image;
    try {
        const newArticle = new ArticleModel({naslov, text, type, image});
        const savedArticle = await newArticle.save();
        res.status(200).json(savedArticle);
    }
    catch(err) {
        res.status(400).json({
            msg: "Article post failed",
            err: err
        })
    }
}

//=======================================================================

exports.getAllArticles = async (req, res) => {
    try {
        const articles = await ArticleModel.find({});
        res.status(200).json(articles);
    }
    catch(err) {
        res.status(400).json({
            msg: "Articles get failed",
            err: err
        })
    }
}
//====================================================================================

exports.getArticleById = async (req, res) => {
    const id = req.params.articleId;
    try {
        const article = await ArticleModel.findById(id);
        res.status(200).json(article)
    }
    catch(err) {
        res.status(400).json({
            msg: "Article get failed",
            err: err
        })
    }
}

//======================================================================================

exports.updateArticleById = async (req, res) => {
    const id = req.body.articleId;
    const article = req.body.article;
    try {
        ArticleModel.findByIdAndUpdate(id, {
            $set: article
        })
    }
    catch(err) {
        res.status(400).json({
            msg: "Update article failed",
            err: err
        })
    }
}

//======================================================================================

exports.deleteArticleById = async (req, res) => {
    const id = req.params.articleId;
    try {
        const article = await ArticleModel.findByIdAndDelete(id);
        res.status(200).json(article);
    }
    catch(err) {
        res.status(400).json({
            msg: "Delete article failed",
            err: err
        })
    }
}