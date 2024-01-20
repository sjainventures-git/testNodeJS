const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    aid: {
        type: Number,
		default: '0'
    },
    status: {
        type: Number,
		default: '1'
    },
    email: {
        required: true,
        type: String,
		unique: true
    },
    mobile: {
        required: true,
        type: String,
		unique: true
    },
    password: {
        required: true,
        type: String
    }
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

dataSchema.plugin(autoIncrement.plugin,{
  model: "adminuser1", // collection or table name in which you want to apply auto increment
  field: "aid", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
}
);

module.exports = mongoose.model('adminuser', dataSchema) 