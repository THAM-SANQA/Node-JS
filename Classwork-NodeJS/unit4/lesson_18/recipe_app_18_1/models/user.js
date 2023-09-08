"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema( //create user schema
    {
      name: { //add first and last name properties
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
      },
      zipCode: {
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
      },
      password: {
        type: String,
        required: true
      }, // add a password property
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }], //add a courses property to connect users to courses
      subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
      } //add a subscribedAccont to connect users to subscribers
    },
    {
      timestamps: true //add a timestamps property to record createdAt and updatedAt dates.
    }
  );

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`; //add a virtual attribute to get user's full name
});
module.exports = mongoose.model("User", userSchema);
