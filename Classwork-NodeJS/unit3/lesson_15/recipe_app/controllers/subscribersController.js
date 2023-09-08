"use strict";
//require the subscriber module
const Subscriber = require("../models/subscriber"); 

//export getAllSubscribers to pass data from the database to the next middleware function
//rewrote the getAllSubscriber acion
exports.getAllSubscribers = (req, res) => {
  Subscriber.find({})
    .exec() //return a promise from the find query
    .then(subscribers => { //send saved data to the nexxt then block code
      res.render("subscribers", {
        subscribers: subscribers
      }); //serve results from the database
    })
    .catch(error => { //catch errors rejected in the promise
      console.log(error.message);
      return [];
    })
    .then(() => { //end the promise chain with a log promise return.
      console.log("promise complete");
    });
};

exports.getSubscriptionPage = (req, res) => {
  res.render("contact");
};

exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    email: req.body.email,
    zipCode: req.body.zipCode
  });
  newSubscriber
    .save() //save new subscriber with a promise return
    .then(result => {
      res.render("thanks");
    })
    .catch(error => {
      if (error) res.send(error);
    });
};
