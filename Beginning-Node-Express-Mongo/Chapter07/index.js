const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js');
const fileUpload = require('express-fileupload');
const app = new express();
app.use(express.static('public'));
// the next 2 functions enable the app to handle POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// With app.set('view engine','ejs'), we tell Express to use EJS as our templating engine, 
// that any file ending in .ejs should be rendered with the EJS package.
app.set('view engine', 'ejs');
app.use(fileUpload());
mongoose.connect('mongodb://127.0.0.1/my_database', {useNewUrlParser: true});

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({});
    res.render('index', {
        blogposts
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', { blogpost });
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', (req, res) => {
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/img', image.name), async (error) => {
        await BlogPost.create({...req.body, image: '/img/' + image.name})
        .then(res.redirect('/'))
        .catch(error => { console.log(error)});
    });
});

app.listen(3000, () => {
    console.log("App listening on port 3000");
});