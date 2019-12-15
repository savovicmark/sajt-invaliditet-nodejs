const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    naslov: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    type: {
        type: String,
        enum: ['vijest', 'projekat']
    },
    realizovan: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collation: {locale: 'en_US', strength: 1}
})

const ArticleModel = mongoose.model('Article', ArticleSchema);

module.exports = ArticleModel;