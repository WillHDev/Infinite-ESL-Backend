
"use strict";
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Task = require('../models/task');
//needed or disruptive?
const fs = require("fs");
// const jsonParser = bodyParser.json();


// router.use(jsonParser);


const path = require("path");
const { reset } = require("nodemon");
//fn resolve
const pathToFile = path.resolve("./data.json");
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

router.post("/", (req, res) => {
    console.log("Data has hit post endpoint");
    console.log(req.body);
    
    res.send("Data has been received");
});

// const createdtask = new Task({
//     title,
//     description,
//     tags, 
//     assignedTo
// });


module.exports = router;