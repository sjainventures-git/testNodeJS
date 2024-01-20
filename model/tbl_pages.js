const mongoose = require('mongoose');
// const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
    pagename: {
        required: true,
        type: String
    },
    pagecontent: {
        required: true,
        type: String
    },
}, {timestamps: true});

// autoIncrement.initialize(mongoose.connection);

// dataSchema.plugin(autoIncrement.plugin,{
  // model: "adminuser1", // collection or table name in which you want to apply auto increment
  // field: "aid", // field of model which you want to auto increment
  // startAt: 1, // start your auto increment value from 1
  // incrementBy: 1, // incremented by 1
// }
// );

module.exports = mongoose.model('tbl_pages', dataSchema) 