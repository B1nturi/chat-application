const createError = require('http-errors');

// 404 not found handler
function notFound(req, res, next) {
    next(createError(404, 'Not found'));
}

// default error handler
function errorHandler(err, req, res, next) {
    res.locals.error =
        process.env.NODE_ENV === 'development' ? err : { message: err.message };

    res.status(err.status || 500);
    
    if (res.locals.html) {
        // html response
        res.render('error', {
            title: 'Error Page',
        });
    } else {
        // json response
        res.json(res.locals.error);
    }
}

// export
module.exports = {
    notFound,
    errorHandler
};