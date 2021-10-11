

"use strict";


const fs = require("fs");
// const jsonParser = bodyParser.json();


// router.use(jsonParser);


const path = require("path");
const { reset } = require("nodemon");
//fn resolve
const pathToFile = path.resolve("./data.json");
const HttpError = require('../models/http-error');
// const cors = require("cors");

 
// var corsOptions = {
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
// app.use(cors(corsOptions));
//reading from file vs. request
const getResources = () => JSON.parse(fs.readFileSync(pathToFile));


const getTasksByUserId = (req, res, next) => {
  //console.log("getTaskByuserId hit");
    const userId = req.params.uid;

    const tasks = getResources().filter(p => {
      return p.creator === userId;
    });
  
    if (!tasks || tasks.length === 0) {
      return next(
        new HttpError('Could not find tasks for the provided user id.', 404)
      );
    }
  
    res.json({ tasks });
  };




//exports.getPlaceById = getPlaceById;
exports.getTasksByUserId = getTasksByUserId;
// exports.createPlace = createPlace;
// exports.updatePlace = updatePlace;
// exports.deletePlace = deletePlace;