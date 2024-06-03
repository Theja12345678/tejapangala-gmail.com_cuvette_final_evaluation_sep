const express = require("express")
const router = express.Router();
const bcrypt = require("bcrypt")
const User=require("../models/User");
const jwt = require("jsonwebtoken")




const register = async (req, res, next) => {

    try {
        const { name, password, email } = req.body;
        console.log(name, password, email);
        if (!name || !email || !password) {
            return res.json({
                errorMessage: "Bad request",
            });

        }
        const isExistingUser = await User.findOne({ email: email ,name:name,password:password});

        if (isExistingUser) {
            return res.status(409).json({ errorMessage: "user Already exist" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const userData = new User({
            name,
            email,
            password: hashedPassword,
        });

        await userData.save();
        res.json({ message: "User registered successfully" });


    } catch (error) {
        next(error)

    }
}



const loginUser = async (req, res, next) => {

    try {
        const { password, email } = req.body;

        if (!email || !password) {
            return res.status(405).json({
                errorMessage: "Bad request",
            });

        }
        const userDetails = await User.findOne({ email });

        if (!userDetails) {
            return res.status(409).json({ errorMessage: "Invalid credential" });
        }
        const passwordMatch = await bcrypt.compare(password, userDetails.password);

        if (!passwordMatch) {
            return res.status(409).json({ errorMessage: "Invalid credential", success: false });
        }

        const token = jwt.sign(
            { userId: userDetails._id },
            process.env.SECRET_KEY
        );

        res.cookie("token", token, { httpOnly: true });

        res.json({
            message: "User logged in",
            name: userDetails.name,
            token: token,
        });
    }
    catch (error) {
        next(error)


    }
}


const logout = (req, res) => {
   
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
  };

module.exports = { loginUser, register,logout };