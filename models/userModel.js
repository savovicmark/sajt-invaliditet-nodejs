const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, "Korisnicko ime mora imati najmanje 4 karaktera"],
        maxlength: [20, "Korisnicko ime ne moze imati vise od 20 karaktera"]
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    banned: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    collation: {locale: 'en_US', strength: 1}
})

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;