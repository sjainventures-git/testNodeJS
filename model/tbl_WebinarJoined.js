const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
	room_name: {
        required: true,
        type: String
    },
	session_id: { required: false, type: String },
	joined_at: { required: false, type: String },
	left_at: { required: false, type: String },
	reason: { required: false, type: String },
	message: { required: false, type: String },
	user_name: { required: false, type: String },
	duration: { required: false, type: String },
	session_started_at: { required: false, type: String },
}, {timestamps: true})



module.exports = mongoose.model('tbl_WebinarJoined', dataSchema) 