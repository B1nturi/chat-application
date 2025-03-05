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
            where: {
                email: req.body.email,
            },
        });
        // if user not found
        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }
        // if user found
        // check password
        const isValidPassword = user.comparePassword(req.body.password);
        if (!isValidPassword) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }
        // generate token
        const token = user.generateToken();
        // send response
        res.status(200).json({
            message: 'Login successful',
            token,
        });
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