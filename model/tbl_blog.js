const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
    blogid: {
        type: Number
    },
	title: {
        required: true,
        type: String
    },
	slug: {
        required: false,
        type: String
    },
    category: {
        required: true,
        type: Number,
		default: 0
    },
    subcategory: {
        required: false,
        type: Number,
		default: 0
    },
    metadescription: {
        required: false,
        type: String,
		default: ""
    },
    description: {
        required: false,
        type: String,
		default: ""
    },
    image: {
        required: false,
        type: String,
		default: ""
    },
    status: {
        type: Number,
		default: 0
    },
    view: {
        type: Number,
		default: 500
    }
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

dataSchema.plugin(autoIncrement.plugin,{
  model: "tbl_blog", // collection or table name in which you want to apply auto increment
  field: "blogid", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
}
);

module.exports = mongoose.model('tbl_blog', dataSchema) 