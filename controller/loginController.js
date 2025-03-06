// external imports
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

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

        // if user not found
        if (!user) {
            throw createError('Login failed! Please try again.');
        }

        // compare password
        const isMatch = await bcrypt.comparePassword(req.body.password, user.password);
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
            res.cookie(process.env.COOKIE_NAME, token, {
                maxAge: process.env.JWT_EXPIRES_IN,
                signed: true,
                httpOnly: true,
            });

            // set logged in user local identifier
            res.locals.loggedInUser = userObject;

            // send response
            res.render("inbox");
        } else {
            throw createError('Login failed! Please try again.');
        }

    } catch (err) {
        res.render('login', {
            data: {
                username: req.body.username,
            },
            errors: {
                common: {
                    msg: err.message,
                },
            },
        });
    }
}

// export
module.exports = {
    getLogin,
    postLogin,
};