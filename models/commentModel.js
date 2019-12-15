const mongoose = require('mongoose');

const ReplySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: [6, "Komentar mora imati najmanje 6 karaktera"],
        maxlength: [360, "Komentar ne moze imati vise od 360 karaktera"]
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: [6, "Komentar mora imati najmanje 6 karaktera"],
        maxlength: [360, "Komentar ne moze imati vise od 360 karaktera"]
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    replies: [ReplySchema]
}, {
    timestamps: true
})

const CommentModel = mongoose.model('Comment', CommentSchema);

module.exports = CommentModel;