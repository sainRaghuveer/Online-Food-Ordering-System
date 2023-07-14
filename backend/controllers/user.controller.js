const generateToken = require("../configs/generateToken");
const { userModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    const userExists = await userModel.findOne({ email });

    if (userExists) {
        res.status(200).send({ "msg": "User Already Exists" });
    } else {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                res.status(400);
                throw new Error("User not found");
            } else {
                const user = new userModel({ name, email, password:hash });
                await user.save();
                res.status(200).send({ "msg": "User registered successful", name:user.name, email:user.email });
            }
        });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("Please Enter all the Fields");
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).send({ "msg": "user don't exist please register first" });
        } else {
            bcrypt.compare(password, user.password, async (err, result) => {
                if (result) {
                    var token = jwt.sign({ userExist: user._id }, process.env.SECRET, { expiresIn: "10h" });
                    res.status(200).send({ "msg": "user logged in successful", "user": { name: user.name, email: user.email, _id: user._id, token:token }})

                } else {
                    res.status(400).send({ "msg": "Wrong password or email" })
                }
            });
        }
    } catch (error) {
        res.status(500).send({ "msg": "Something went wrong", "error": error.message });
    }
}


module.exports = {
    registerUser, loginUser
}