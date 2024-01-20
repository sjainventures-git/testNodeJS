const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
    courseinstid: {
		required: true,
        type: Number,
		default: '0'
    },
	tid: {
		required: true,
        type: Number,
		default: '0'
    },
	courseid: {
		required: true,
        type: Number,
		default: '0'
    },
	title: {
        required: true,
        type: String
    },
    subtitle: {
        required: false,
        type: String
    },
    rating: {
        type: Number,
		default: 5
    },
    image: {
        type: String,
		default: ''
    },
	description: {
        required: false,
        type: String
    },
    featured: {
        type: Number,
		default: 0
    },
    status: {
        type: Number,
		default: 1
    }
}, {timestamps: true});

autoIncrement.initialize(mongoose.connection);

dataSchema.plugin(autoIncrement.plugin,{
  model: "tbl_course_instructor", // collection or table name in which you want to apply auto increment
  field: "courseinstid", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
}
);

module.exports = mongoose.model('tbl_course_instructor', dataSchema) 