"use strict";

const router = require("express").Router(), //Require the Express.js Router and coursesController
  coursesController = require("../controllers/coursesController");

router.get(
  "/courses",
  coursesController.index, //Create a route for the courses data endpoint
  coursesController.filterUserCourses,
  coursesController.respondJSON
);
router.get("/courses/:id/join", coursesController.join, coursesController.respondJSON); //Create a route to join a course by ID
router.use(coursesController.errorJSON); // Handle all API errors

module.exports = router;
