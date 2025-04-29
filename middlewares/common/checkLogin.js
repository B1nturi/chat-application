const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
    let cookie =
        Object.keys(req.signedCookies).length > 0
            ? req.signedCookies
            : null;
    if (cookie) {
        try {
            const token = cookie[process.env.COOKIE_NAME];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            // pass the user to the next middleware
            if (res.locals.html) {
                res.locals.loggedInUser = decoded;
            }
            next();
        }
        catch (err) {
            if (res.locals.html) {
                res.render('login', {
                    errors: {
                        common: {
                            msg: err.message,
                        },
                    },
                });
            }
            else {
                res.status(500).json({
                    errors: {
                        common: {
                            msg: "Authentication failed!",
                        },
                    },
                });
            }
        }
    } else {
        if (res.locals.html) {
            res.render('login', {
                errors: {
                    common: {
                        msg: "Authentication failed!",
                    },
                },
            });
        }
        else {
            res.status(401).json({
                errors: {
                    common: {
                        msg: "Authentication failed!",
                    },
                },
            });
        }
    }
}

const redirectLoggedIn = (req, res, next) => {
    let cookies =
        Object.keys(req.signedCookies).length > 0
            ? req.signedCookies
            : null;
    if (!cookies) {
        next();
    } else {
        res.redirect('/inbox');
    }
}

// export
module.exports = {
    checkLogin, 
    redirectLoggedIn
};