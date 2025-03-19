// external imports
const { check, validationResult } = require('express-validator');

const loginValidator = [
    check("username")
        .isLength({
            min: 1
        })
        .withMessage("Username is required"),

    check("password")
        .isLength({
            min: 1
        })
        .withMessage("Password is required")
];

const loginValidationHandler = (req, res, next) => {
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next();
    } else {
        res.render("login", {
            errors: mappedErrors,
            data: {
                username: req.body.username,
            }
        });
    }
}

module.exports = {
    loginValidators,
    loginValidationHandler,
};