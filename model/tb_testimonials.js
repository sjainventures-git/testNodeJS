const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    subtitle: {
        required: false,
        type: String
    },
    testimonialid: {
        type: Number,
		default: '0'
    },
    courseid: {
        type: String,
		default: 0
    },
    rating: {
        type: Number,
		default: 5
    },
    description: {
        type: String,
		default: ''
    },
    image: {
        type: String,
		default: ''
    },
    featured: {
        type: Number,
		default: 0
    },
    status: {
        type: Number,
		default: 1
    }
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

dataSchema.plugin(autoIncrement.plugin,{
  model: "tb_testimonials", // collection or table name in which you want to apply auto increment
  field: "testimonialid", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
}
);

module.exports = mongoose.model('tb_testimonials', dataSchema) 