const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
    tid: {
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
    phonenumberCountry: {
        required: false,
        type: String
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
    cvfile: { required: false, type: String },
    coursecati: { required: false, type: String },
    youtube: { required: false, type: String },
    linkedin: { required: false, type: String },
    language: { required: false, type: String },
    teachdone: { required: false, type: String },
    vidrating: { required: false, type: String },
    exiaudi: { required: false, type: String },
    val2std: { required: false, type: String },
    namecourse: { required: false, type: String },
    tarstd: { required: false, type: String },
    prereq: { required: false, type: String },
    docstahelp: { required: false, type: String },
    crsready: { required: false, type: String },
    country: { required: false, type: String },
    state: { required: false, type: String },
    city: { required: false, type: String },
    photo: { required: false, type: String, default: '' },
    description: { required: false, type: String },
    password: {
        required: true,
        type: String
    }
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

dataSchema.plugin(autoIncrement.plugin,{
  model: "tb_instructure", // collection or table name in which you want to apply auto increment
  field: "tid", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
}
);

module.exports = mongoose.model('tb_instructure', dataSchema)