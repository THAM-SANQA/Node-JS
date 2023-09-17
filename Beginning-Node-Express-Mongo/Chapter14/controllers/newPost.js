module.exports = (req, res) => {
    // checks if a user is logged in before rendering the create post page
    if (req.session.userId) {
        return res.render('create', { createPost: true});
    }
    res.redirect('/auth/login');
};