const BlogPost = require('../models/BlogPost.js');
//importing path using require
const path = require('path');

// add ‘..’ to path.resolve because we have to go up one folder before referring to public/img
module.exports = (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, '..', 'public/img', image.name), async (error) => {
        await BlogPost.create({...req.body, image: '/img/' + image.name});
        res.redirect('/')
    });
};