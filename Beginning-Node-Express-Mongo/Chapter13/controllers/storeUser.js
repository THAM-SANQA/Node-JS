const User = require('../models/User.js');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        if (error) {
            // we map through the error.errors array keys and for each of them,
            // access the key's error message property
            const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message);
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            console.log(error);
            return res.redirect('/auth/register/');
        }
        res.redirect('/')
    })
}