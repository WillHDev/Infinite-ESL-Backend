
"use strict";
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');


const Task = require('../models/task');
//needed or disruptive?
const fs = require("fs");
// const jsonParser = bodyParser.json();


// router.use(jsonParser);


const path = require("path");
const { reset } = require("nodemon");
//fn resolve
const pathToFile = path.resolve("./data.json");

const { check } = require('express-validator');

const tasksControllers = require('../controllers/tasks-controllers');
// const cors = require("cors");

 
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// app.use(cors(corsOptions));
//reading from file vs. request
const getResources = () => JSON.parse(fs.readFileSync(pathToFile));

router.get("/", (req, res, next) => {
    console.log("Get all endpoint hit");
    const resources = getResources();
    console.log(resources);
    return res.send(resources);
//   return Books.find()
//     .populate("nuggets")
//     .sort({ vote: 1 })
//     .populate("comments")
//     .then(books => {
//       //console.log("Books JSON", books);
//       res.json(books);
//     })
//     .catch(err => {
//       next(err);
//     });
});

router.get('/user/:uid', tasksControllers.getTasksByUserId);

router.get("/:id",  (req, res, next) => {
    console.log("resource id hit with get");
        const taskId = req.params.id; // { pid: 'p1' }
      
        const task = getResources().find(p => {
          return p.id === taskId;
        });
      
        if (!task) {
          throw new HttpError('Could not find a task for the provided id.', 404);
        }
      
        res.json({ task }); // => { task } => { task: task }
      }
)

router.post("/", async (req, res, next) => {
    console.log("Data has hit post endpoint");
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(
        new HttpError('Invalid inputs passed, please check your data.', 422)
      );
    }
  
    const { title, description, tags, assignedTo, creator } = req.body;
    const createdTask = new Task({
    title,
    description,
    tags, 
    assignedTo, 
     creator
});
    
  try {
    await createdTask.save();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }
  
  res.status(201).json({ task: createdTask });
    //res.send("Data has been received");
});




module.exports = router;