
"use strict";
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const jsonParser = bodyParser.json();


// router.use(jsonParser);

router.get("/", (req, res, next) => {
  return Books.find()
    .populate("nuggets")
    .sort({ vote: 1 })
    .populate("comments")
    .then(books => {
      //console.log("Books JSON", books);
      res.json(books);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;