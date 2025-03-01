// external imports
const bcrypt = require('bcryptjs');

// internal imports
const User = require('../models/People');

// getUsers page
function getUsers(req, res) {
    res.render('users');
}

// add user
async function addUser(req, res) {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.file && req.files.length > 0) {
        newUser = new User({
            ...req.body,
            avatar: req.files[0].filename,
            password: hashedPassword,
        });
    } else {
        newUser = new User({
            ...req.body,
            password: hashedPassword
        });
    }

    // save user or send error
    try {
        const result = await newUser.save();
        res.status(201).json({
            message: 'User added successfully'
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Unknown error occured!'
                }
            }
        });
    }
}

// export
module.exports = {
    getUsers,
    addUser,
};