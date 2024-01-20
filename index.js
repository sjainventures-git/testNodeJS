require('dotenv').config();
var cors = require('cors')

const fileupload = require("express-fileupload");
const bodyParser = require('body-parser');

const express = require('express');
const app = express();
const mongoose = require('mongoose');

		// console.log("Rahul");

const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.use(cors())
app.use(express.json());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const enquiry  			= 	require('./controller/admin/institute/enquiry');
const student  			= 	require('./controller/admin/accounts/student');
const instructure  		= 	require('./controller/admin/accounts/instructure');
const admincourses  	= 	require('./controller/admin/course/courses');
const coursecategory  	= 	require('./controller/admin/master/coursecategory');
const advisoryboard  	= 	require('./controller/admin/master/advisoryboard');
const testimonials  	= 	require('./controller/admin/master/testimonials');
const accreditations 	= 	require('./controller/admin/master/accreditations');
const renownedclients 	= 	require('./controller/admin/master/renownedclients');
const gallery  			= 	require('./controller/admin/master/gallery');
const homeslider  		= 	require('./controller/admin/master/homeslider');
const topmessage  		= 	require('./controller/admin/master/topmessage');
const faqs  			= 	require('./controller/admin/master/faqs');
const adminaccount  	= 	require('./controller/adminaccount');
const homepage      	=	require('./controller/homepage');
const mastersetting 	=	require('./controller/master');
const blogcategory 		=	require('./controller/admin/blog/blogcategory'); 


const blog 				=	require('./controller/admin/blog/blog');

const webicategory 		=	require('./controller/admin/webinar/webicategory'); 
const webinar 			=	require('./controller/admin/webinar/webinar'); 


const course 			=	require('./controller/admin/course/courses'); 
const courseInstructor	=	require('./controller/admin/course/courseInstructor'); 


const ms100				=	require('./controller/ms100');  

app.use('/admin/ms100', ms100);
app.use('/institute/enquiry', enquiry);
app.use('/admin/student', student);
app.use('/admin/instructure', instructure);
app.use('/admin/courses', admincourses);
app.use('/admin/blog', blog);
app.use('/blog', blog);
app.use('/admin/blogcategory', blogcategory);

app.use('/course', course);
app.use('/admin/courseInstructor', courseInstructor);
app.use('/webinars', webinar);


app.use('/admin/coursecategory', coursecategory);
app.use('/webicategory', webicategory);
app.use('/admin/advisoryboard', advisoryboard);
app.use('/admin/testimonials', testimonials);
app.use('/admin/gallery', gallery);
app.use('/admin/topmessage', topmessage);
app.use('/admin/homeslider', homeslider);
app.use('/admin/faqs', faqs);
app.use('/admin/accreditations', accreditations);
app.use('/admin/renownedclients', renownedclients);
app.use('/admin/account', adminaccount);
app.use('/admin/master', mastersetting);
app.use(homepage);

app.get('/',(req,res)=>{
    res.send(" <h1>Redireting to Main Site </h1> <script> window.location.href='https://www.docstainstitute.com'; </script>")
});

// app.use(express.json());

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
});