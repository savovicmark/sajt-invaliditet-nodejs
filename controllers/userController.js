const UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.postUser = async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password.trim();
    const email = req.body.email.trim();
    try {
        const users = await UserModel.find({"username": username});
        if (users.length > 0) {
            res.status(400).json({
                msg: "Korisnicko ime vec postoji"
            })
        }
        hashPass = await bcrypt.hash(password, 10);
        const newUser = new UserModel({username, email, password: hashPass});
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } 
    catch(err) {
        res.status(400).json({
            msg: "User save failed",
            err: err
        })
    }
}

//=======================================================================================================

exports.loginUser = async (req, res) => {
    const username = req.body.username.trim();
    const password = req.body.password;
    try {
        const user = await UserModel.findOne({"username": username});
        if (!user) {
            res.status(400).json({
                msg: "Login failed no such user"
            })
        }
        const hash = user.password;
        const compare = await bcrypt.compare(password, hash);
        if (compare) {
            res.status(200).json(user);
        } else {
            res.status(400).json({
                msg: "Login failed password incorect"
            })
        }
    }
    catch(err) {
        res.status(400).json({
            msg: "Login failed server error",
            err: err
        })
    }
}