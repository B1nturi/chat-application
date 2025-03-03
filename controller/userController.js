// external imports
const bcrypt = require('bcryptjs');
const { unlink } = require('fs');
const path = require('path');

// internal imports
const User = require('../models/People');

// getUsers page
async function getUsers(req, res, next) {
    try {
        const users = await User.find();
        res.render('users', {
            users: users
        });
    } catch (err) {
        next(err);
    }
}

// add user
async function addUser(req, res, next) {
    let newUser;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.files && req.files.length > 0) {
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

// remove user
async function removeUser(req, res, next) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        const imagePath = path.join(__dirname, `../public/uploads/avatars/${user.avatar}`);

        // delete user avatar
        unlink(imagePath, async (err) => {
            if (err) {
                next(err);
            }

            // delete user
            // await user.remove();
        });
        
        res.json({
            message: 'User removed successfully'
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: 'Could not delete the user!'
                }
            }
        });
    }
}

// export
module.exports = {
    getUsers,
    addUser,
    removeUser,
};