const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true},
    description: { type: String, required: true} ,
    tags: [
       {type: String} 
    ] ,
    assignedTo: [{
       
    name: {type: String, required: true},
    id: {type: String, required: true}
    }],
    creator: {type: String, required: true}
});


taskSchema.set("toObject", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  });

module.exports = mongoose.model('Task', taskSchema);

// const tagsSchema = new Schema({

// });

// const assignedToSchema = new Schema({

//});
