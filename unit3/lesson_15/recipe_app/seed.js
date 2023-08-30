"use strict";

const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

// set up the connection to the database
mongoose.connect(
  "mongodb://localhost:27017/recipe_db",
  { useNewUrlParser: true }
);
mongoose.connection;

var contacts = [
  {
    name: "Jon Wexler",
    email: "jon@jonwexler.com",
    zipCode: 10016
  },
  {
    name: "Chef Eggplant",
    email: "eggplant@recipeapp.com",
    zipCode: 20331
  },
  {
    name: "Professor Souffle",
    email: "souffle@recipeapp.com",
    zipCode: 19103
  }
];

Subscriber.deleteMany()
  .exec() //removing all existing data
  .then(() => {
    console.log("Subscriber data is empty!");
  });

var commands = [];

contacts.forEach(c => { //loop through subscriber opbjects to create promises
  commands.push(
    Subscriber.create({
      name: c.name,
      email: c.email
    })
  );
});

Promise.all(commands)
  .then(r => { //log confirmation after promises resolve
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(error => {
    console.log(`ERROR: ${error}`);
  });
