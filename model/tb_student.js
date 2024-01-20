const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
    sid: {
        type: Number,
		default: '0'
    },
    name: {
        required: true,
        type: String
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
    status: {
        type: Number,
		default: '1'
    },
    password: {
        required: true,
        type: String
    }
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

dataSchema.plugin(autoIncrement.plugin,{
  model: "tb_student", // collection or table name in which you want to apply auto increment
  field: "sid", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
}
);

module.exports = mongoose.model('tb_student', dataSchema) 