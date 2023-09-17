const BlogPost = require('../models/BlogPost.js');

module.exports = async (req, res) => {
    // .populate automitically references the specified document
    // with the userid in the collection
    const blogpost = await BlogPost.findById(req.params.id).populate('userid');
    console.log(blogpost);
    res.render('post', { blogpost });
}