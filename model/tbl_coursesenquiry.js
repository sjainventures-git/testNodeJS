const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
	courseid: {
        required: true,
        type: String
    },
	coursetitle: {
        required: false,
        type: String
    },
	coursetype: {
        required: false,
        type: String,
		default: 'course'
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phonenumberCountry: {
        required: false,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
	message: {
        required: false,
        type: String
    },
    courseenqid: {
        type: Number,
		default: '0'
    },
    status: {
        type: Number,
		default: '0'
    }
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

dataSchema.plugin(autoIncrement.plugin,{
  model: "tbl_coursesenquiry", // collection or table name in which you want to apply auto increment
  field: "courseenqid", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
}
);

module.exports = mongoose.model('tbl_coursesenquiry', dataSchema) 