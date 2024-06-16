const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
exports.Signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (role === '') {
            role = 'Visistor'
        }
        const response = await User.findOne({ email });
        if (response) {
            return res.status(300).json({
                success: false,
                message: 'Email already exists'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword, role })
        return res.status(200).json({
            succes: true,
            message: 'Account created succesfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).json({
                succes: false,
                message: "pehle signup karke a "
            })
        }
        if (bcrypt.compare(password, existingUser.password)) {
            const payload = {
                id: existingUser._id,
                role: existingUser.role,
                email: existingUser.email
            }
            const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: '2h'
            })
            console.log(token);
            res.status(200).json({
                token,
                success: true,
                message: 'Login successful'
            })


        } else {
            return res.status(400).json({
                succes: false,
                message: "Incorrect password "
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}