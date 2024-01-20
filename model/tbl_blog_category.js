const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    parent: {
        type: Number,
		default: '0'
    },
    blogcatid: {
        type: Number,
		default: '0'
    },
	view:{
        type: Number,
		default: '0'
    },
    description: {
        type: String,
		default: ''
    },
    metadescription: {
        type: String,
		default: 'ACTVET Licensed best training center in Abu Dhabi specializes in providing Technical, Futuristic Skills, Corporate Training Programs.'
    },
    image: {
        type: String,
		default: ''
    },
    status: {
        type: Number,
		default: '1'
    }
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

dataSchema.plugin(autoIncrement.plugin,{
  model: "tbl_blog_category", // collection or table name in which you want to apply auto increment
  field: "blogcatid", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
}
);

module.exports = mongoose.model('tbl_blog_category', dataSchema) 