const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
	room_name: {
        required: true,
        type: String
    },
	session_id: { required: false, type: String },
	size: { required: false, type: String },
	duration: { required: false, type: String },
	session_started_at: { required: false, type: String },
	session_stopped_at: { required: false, type: String },
	YouTubeID: { required: false, type: String, default: '0' },
}, {timestamps: true})



module.exports = mongoose.model('tbl_webinarRecordings', dataSchema) 