// external imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// internal imports
const User = require('../model/User');

// getLogin page
function getLogin(req, res) {
    res.render('login');
}

// do login
async function postLogin(req, res) {
    try {
        // find a user who has this email/username
        const user = await User.findOne({
            $or: [
                { email: req.body.email },
                { username: req.body.email },
            ],
        });

        // compare password
        const isMatch = await user.comparePassword(req.body.password, user.password);
        if (isMatch) {
            // prepare user object to generate token
            const userObject = {
                username: user.username,
                mobile: user.mobile,
                email: user.email,
                role: "user",
            };

            // generate token
            const token = jwt.sign(userObject, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,

            });

            // set cookie
            res.cookie('token', token, {
                httpOnly: true, 
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            // send response
            res.status(200).json({
                message: 'Login successful',
            });
        }


    } catch (err) {
        res.status(500).json({
            message: 'Server error',
        });
    }
}

// export
module.exports = {
    getLogin,
    postLogin,
};