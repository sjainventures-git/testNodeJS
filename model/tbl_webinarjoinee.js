const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
	webinarid: {
        required: true,
        type: String
    },
	webinartitle: {
        required: false,
        type: String
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
    status: {
        type: Number,
		default: 1
    }
}, {timestamps: true})



module.exports = mongoose.model('tbl_webinarjoinee', dataSchema) 