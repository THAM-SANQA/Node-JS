"use strict";

const User = require("../models/user"); //require the user model

module.exports = {
  index: (req, res, next) => {
    User.find() //run query in index action only
      .then(users => { //render the index page with an array of users
        res.locals.users = users; //store user data on the response and call the middleware function
        next();
      })
      .catch(error => { //log error messages and redirect to the home page
        console.log(`Error fetching users: ${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  }
};
