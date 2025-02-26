// getUsers page
function getUsers(req, res) {
    res.render('users', {
        title: 'Users Page',
    });
}

// export
module.exports = { 
    getUsers,
};