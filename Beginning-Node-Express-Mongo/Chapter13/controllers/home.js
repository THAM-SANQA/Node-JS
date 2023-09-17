const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) => {
    // .populate automitically references the specified document
    // with the userid in the collection
    const blogposts = await BlogPost.find({}).populate('userid');
    console.log(req.session);
    res.render('index', { blogposts });
};