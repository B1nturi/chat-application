// get inbox page
function getInbox(req, res) {
    res.render('inbox', {
        title: 'Inbox Page',
    });
}

// export
module.exports = {
    getInbox,
};