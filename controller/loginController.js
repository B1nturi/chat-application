// getLogin page
function getLogin(req, res) {
    res.render('login', {
        title: 'Login Page',
    });
}

// export
module.exports = { 
    getLogin,
};