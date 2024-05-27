const mongoose = require('mongoose');
const Buyer = require('../models/buyermodel');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    console.log("Inside register Request!!!");
    const { firstname, lastname, email, phonenumber, password } = req.body;
    console.log(firstname, lastname, email, phonenumber, password);
    try {
        const existingBuyer = await Buyer.findOne({ email });
        if (existingBuyer) {
            return res.status(406).json("User Already exists!!!");
        } else {
            const newBuyer = new Buyer({
                firstname, lastname, email, phonenumber, password
            });
            await newBuyer.save();
            return res.status(200).json(newBuyer);
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.login = async (req, res) => {
    console.log("Inside buyer login");
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const existingUser = await Buyer.findOne({ email, password });
        if (existingUser) {
            try {
                const token = jwt.sign({ userId: existingUser._id, role: 'buyer' }, process.env.JWT_SECRET);
                const response = {
                    user: existingUser,
                    token,
                    role: 'buyer'
                };
                return res.status(200).json(response);
            } catch (jwtError) {
                console.error("JWT Error:", jwtError);
                return res.status(500).json({ error: "JWT Signing Error" });
            }
        } else {
            return res.status(404).json("Invalid email / password");
        }
    } catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
