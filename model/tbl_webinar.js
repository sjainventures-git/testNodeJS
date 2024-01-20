const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");

const dataSchema = new mongoose.Schema({
    webinarid: {
        type: Number
    },
    is_deleted: {   // 0 Means deleted and 1 means not deleted
        required: false,
        type: Number,
		default: 1
    },
	title: {
        required: true,
        type: String
    },
	courseslug: 	{ required: false, type: String, default: "0" }, 
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
	validityin: { required: false, type: String, default: "Hours" },
	validity: { required: false, type: String, default: "" },
	startdate: { required: false, type: String, default: "" },
	enddate: { required: false, type: String, default: "" },
	location: { required: false, type: String, default: "Docsta Institute, Office 305, Al Reem Plaza, Electra Street, Abu Dhabi" },
	mode: { required: false, type: String, default: "" },
	include1: { required: false, type: String, default: "Total hours class & video" },
	include2: { required: false, type: String, default: "Hands-on training" },
	include3: { required: false, type: String, default: "Continuing medical education" },
	include4: { required: false, type: String, default: "CME Points" },
	include5: { required: false, type: String, default: "Certificate of Completion" },
	include6: { required: false, type: String, default: "Unique Experience" },
	showdesc2: { required: false, type: Number, default: 0 },
	showdesc3: { required: false, type: Number, default: 0 },
	showdesc4: { required: false, type: Number, default: 0 },
	showdesc5: { required: false, type: Number, default: 0 },
	description: { required: false, type: String, default: "" },
	description2: { required: false, type: String, default: "" },
	description3: { required: false, type: String, default: "" },
	description4: { required: false, type: String, default: "" },
	description5: { required: false, type: String, default: "" },
	addiitrainer: { required: false, type: String, default: "" },
	level: { required: false, type: String, default: "" },
	languauge: { required: false, type: String, default: "" },
	noofpartic: { required: false, type: String, default: "" },
	agegroup: { required: false, type: String, default: "" },
	cost: { required: false, type: String, default: 0 },
	discount: { required: false, type: String, default: 0 },
	banner: { required: false, type: String, default: "" },
	pre_vid: { required: false, type: String, default: "" },
	yt_vid: { required: false, type: String, default: "https://youtu.be/xFBkrBf-o5U" },  // YouTube Video Link
	test_vid: { required: false, type: String, default: "" },
	
	sample_certi: { required: false, type: Number, default: 1 },   // show sample certificate or now 1 or 0 
	alt_tag: { required: false, type: String, default: "" }, 
	meta_description: { required: false, type: String, default: "" }, 
	
	videoduration: 	{ required: false, type: String, default: "0-1 Hour" }, 
	topic: 			{ required: false, type: String, default: " " },
	features: 		{ required: false, type: String, default: " " }, 
	defaultbtn: 	{ required: false, type: String, default: "" }, 
	defaultbtn2: 	{ required: false, type: String, default: "" }, 
	subtitle: 		{ required: false, type: String, default: " " }, 
		
    status: {
        type: Number,
		default: 0
    },
	featured: {
        type: Number,
		default: 0
    },
	rating: {
        type: Number,
		default: 5.0
    },
	learners: {
        type: Number,
		default: 2750
    },
    view: {
        type: Number,
		default: 1000
    }
}, {timestamps: true})

autoIncrement.initialize(mongoose.connection);

dataSchema.plugin(autoIncrement.plugin,{
  model: "tbl_webinar", // collection or table name in which you want to apply auto increment
  field: "webinarid", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
}
);

module.exports = mongoose.model('tbl_webinar', dataSchema) 