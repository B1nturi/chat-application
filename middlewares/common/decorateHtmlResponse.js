function decorateHtmlResponse(page_title) {
  return (req, res, next) => {
    res.locals.html = true;
    res.locals.title = `${page_title} - ${process.env.APP_NAME}`;
    res.locals.color = '#008000';
    next();
  };
}

// export
module.exports = decorateHtmlResponse;