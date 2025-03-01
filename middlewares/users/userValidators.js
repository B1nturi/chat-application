// external imports
const { check, validationResult } = require('express-validator');
const createError = require('http-errors');
const { unlink } = require('fs');
const path = require('path');

// internal imports
const User = require('../../models/People');

// add user validator
const addUserValidators = [
    check('name')
        .not().isEmpty()
        .isAlpha("en-US", { ignore: " -" })
        .withMessage('Name is required!')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Invalid email address!')
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    throw createError('Email already in use!');
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check('phone')
        .isMobilePhone("bn-BD", {
            strictMode: true,
        })
        .withMessage('Invalid bangladeshi phone number!')
        .trim()
        .custom(async (value) => {
            try {
                const user = await User.findOne({
                    phone:
                        value
                });
                if (user) {
                    throw createError('Phone number already in use!');
                }
            } catch (err) {
                throw createError(err.message);
            }
        }),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters long!'),
];

const addUserValidationHandler = (req, res, next) => {
    const errors = validationResult(req);

    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        // remove uploaded file
        if (req.files.length > 0) {
            const { filename } = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${filename}`),
                (err) => {
                    if (err) {
                        console.log('File remove error:', err);
                    }
                }
            );
        }

        // response
        res.status(500).json({
            errors: mappedErrors,
        });
    }
};

// export
module.exports = {
    addUserValidators,
    addUserValidationHandler,
};