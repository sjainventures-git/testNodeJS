const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
	index: {
        type: Number,
		default: '0'
    },
    s_date: {
        required: true,
        type: String
    },
    s_time: {
        required: true,
        type: String
    },
    webinarid: {
        type: Number,
		default: 0
    }
}, { timestamps: false });


module.exports = mongoose.model('tbl_webinar_session', dataSchema) 