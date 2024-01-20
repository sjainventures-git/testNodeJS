const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
    fname: {
        required: true,
        type: String
    },
	lname: {
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
    phonenumber: {
        required: true,
        type: String
    },
    location: {
        required: false,
        type: String
    },
    course: {
        required: false,
        type: String
    },
	fordate: {
        required: false,
        type: String
    },
	participants: {
        required: false,
        type: String
    },
	notes: {
        required: false,
        type: String
    },
    enqid: {
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
  model: "tb_bookaclass", // collection or table name in which you want to apply auto increment
  field: "enqid", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
}
);

module.exports = mongoose.model('tb_bookaclass', dataSchema) 