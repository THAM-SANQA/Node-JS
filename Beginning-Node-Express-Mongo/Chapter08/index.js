const express = require('express');
const path = require('path');
const ejs = require('ejs');
const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost.js');
// allowing files to be uploaded and handled
const fileUpload = require('express-fileupload');
// create a new Express application
const app = new express();
// allows the program to read static files from the public folder
app.use(express.static('public'));
// the next 2 functions enable the app to handle POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// adding custom middleware
const customMiddleware = (req, res, next) => {
    console.log("Custom middleware called");
    next();
}
app.use(customMiddleware);

// validates input from user
// if input fields are empty, redirect to /posts/new
const validateMiddleware = (req, res, next) => {
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new');
    }
    next();
}
app.use('/posts/store', validateMiddleware);

// With app.set('view engine','ejs'), we tell Express to use EJS as our templating engine, 
// that any file ending in .ejs should be rendered with the EJS package.
app.set('view engine', 'ejs');
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