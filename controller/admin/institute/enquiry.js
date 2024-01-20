const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

const md5 = require('md5');
// const qs = require('querystring');
// const emailValidator = require('deep-email-validator');

const router = express.Router();

const fs = require('fs');


const tb_careercounselling = require('../../../model/tb_careercounselling.js'); 
const tb_bookaclass = require('../../../model/tb_bookaclass.js'); 
const tb_bookasteam = require('../../../model/tb_bookasteam.js'); 
const rycommon = require("../../../rycommon.js")  
const tbl_contactform = require('../../../model/tbl_contactform.js'); 
const tbl_coursesenquiry = require('../../../model/tbl_coursesenquiry.js'); 
const tbl_webinarjoinee = require('../../../model/tbl_webinarjoinee.js'); 
const tbl_RequestQuote = require('../../../model/tbl_RequestQuote.js'); 

module.exports = router;


router.post('/AllCounters', async(req, res) => {
	const tb_courses = require('../../../model/tb_courses.js'); 
	const tbl_blog = require('../../../model/tbl_blog.js'); 
	const tbl_webinar = require('../../../model/tbl_webinar.js'); 
	let counters = {};
	
		let filterarray = { status: 0 };
		counters.requestQuote	=	await tbl_RequestQuote.count(filterarray);
		counters.coursesenquiry	=	await tbl_coursesenquiry.count(filterarray);
		counters.bookaclass		=	await tb_bookaclass.count(filterarray);
		counters.bookasteam		=	await tb_bookasteam.count(filterarray);
		counters.contactform	=	await tbl_contactform.count(filterarray);
		
		filterarray = { };
		counters.requestQuoteTotal		=	await tbl_RequestQuote.count(filterarray);
		counters.coursesenquiryTotal	=	await tbl_coursesenquiry.count(filterarray);
		counters.bookaclassTotal		=	await tb_bookaclass.count(filterarray);
		counters.bookasteamTotal		=	await tb_bookasteam.count(filterarray);
		counters.contactformTotal		=	await tbl_contactform.count(filterarray);
			filterarray = { status: 1, is_deleted: 1 };
		counters.courses 		=	await tb_courses.count(filterarray);
		counters.blogs 			=	await tbl_blog.count(filterarray);
		counters.webinars 		=	await tbl_webinar.count(filterarray);

	return res.status(200).json({status: 1, counters}) 
});

// create request-a-quote Enquiry
    router.post('/request-a-quote', async(req, res) => {
          
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1;
                

    try {
            var id       	=   req.body.edit;

            const name       =   rycommon.check_if_value(req,'name','');
            const email       =   rycommon.check_if_value(req,'email','');
			const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            var phone      =   rycommon.check_if_value(req,'phone','');
				phone		= 	phone.trim();
				phone		= 	phone.replace(' ', '');		phone		= 	phone.replace(' ', ''); phone		= 	phone.replace(' ', '');
				phone		= 	phone.replace(' ', '');		phone		= 	phone.replace(' ', ''); phone		= 	phone.replace(' ', '');
				phone		= 	phone.replace(' ', '');		phone		= 	phone.replace(' ', ''); phone		= 	phone.replace(' ', '');
				phone		= 	phone.replace(' ', '');		phone		= 	phone.replace(' ', ''); phone		= 	phone.replace(' ', '');
				

				var newvalues 	= 	{
										courseid			:	rycommon.check_if_value(req,'courseid',0),
										coursetitle			:	rycommon.check_if_value(req,'coursetitle',''),
										name				:	rycommon.check_if_value(req,'name',''),
										email,
										company				:	rycommon.check_if_value(req,'company',''),
										phone,
										message				:	rycommon.check_if_value(req,'message',''),
										participants		:	rycommon.check_if_value(req,'participants',''),
										status				:	0
									};

			if (name === '') {
				isallgood = 0;	
				message = "Name is required."; 
			}
			if (email === '') {
				isallgood = 0;	
				message = "Email is required."; 
			}
			if (phone === '') {
				isallgood = 0;	
				message = "Mobile is required."; 
			}
			if (!emailRegexp.test(email)) {
				isallgood = 0;	
				message = `Email (${email}) is not valid, Please enter it again.`;
			}

			// insert will be here
				if(isallgood==1)
					{
						const data = new tbl_RequestQuote(newvalues);
						const dataToSave = data.save();
					   
	var message	=	`
						<div>
							<table>
								<tr><td style='border:1px solid #f5f5f5; padding:5px;'>For Course</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.coursetitle}</td></tr>
								<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Name</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.name}</td></tr>
								<tr><td style='border:1px solid #f5f5f5; padding:5px;'>No. of Participants</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.participants}</td></tr>
								<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Email</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.email}</td></tr>
								<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Phone Number</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.phone}</td></tr>
								<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Company</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.company}</td></tr>
								<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Message</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.message}</td></tr>
							</table>
						</div>
					`;
					   
						var textmsg = message;
						var htmlmsg = message;
						// var test = rycommon.sendemailsendgrid(rycommon.infoemail, `Request Quote Enquiry for ${newvalues.coursetitle}` , textmsg, htmlmsg);
						// var test = rycommon.sendemailsendgrid('rahul@sjain.io', `Request Quote Enquiry for ${newvalues.coursetitle}` , textmsg, htmlmsg);
					   message  =   "Thanks for your message, we will get back to soon.";
					}
			// insert will be here
			
              
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(400).json({status: 150, message: error.message, newvalues: newvalues})
        }
       
    })
// create request-a-quote Enquiry



// create webinar joinee


// create course contact Enquiry
    router.post('/send-webinar-joinee', async(req, res) => {
          
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1;
                

    try {
            var id       	=   req.body.edit;
			
            var email       =   rycommon.check_if_value(req,'email','');
            var mobile      =   rycommon.check_if_value(req,'phone','');
				mobile		= 	mobile.trim();
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');

				var newvalues 	= 	{
										webinarid			:	rycommon.check_if_value(req,'webinarid',0),
										webinartitle		:	rycommon.check_if_value(req,'webinartitle',''),
										name				:	rycommon.check_if_value(req,'name',''),
										email				:	email,
										phone				:	mobile,
										message				:	rycommon.check_if_value(req,'message',''),
										status				:	0
									};

			// insert will be here
				if(isallgood==1)
					{
						const data = new tbl_webinarjoinee(newvalues);
						const dataToSave = data.save();
					   
						var message	=	`
											<div>
												<table>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>For Webinar</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.webinartitle}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Name</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.name}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Email</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.email}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Phone Number</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.phone}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Message</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.message}</td></tr>
												</table>
											</div>
										`;
					   
						var textmsg = message;
						var htmlmsg = message;
var test = rycommon.sendemailsendgrid(rycommon.infoemail, `Webinar Joined for ${newvalues.webinartitle}` , textmsg, htmlmsg);
// var test = rycommon.sendemailsendgrid('rahul@sjain.io',   `Webinar Joined for ${newvalues.webinartitle}` , textmsg, htmlmsg);
					   message  =   "Thanks for your Joining the webinar.";
					}
			// insert will be here
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(400).json({status: 150, message: error.message, newvalues: newvalues})
        }
       
    })
// create course contact Enquiry

// create webinar joinee

// create course contact Enquiry
    router.post('/send-course-enquiry', async(req, res) => {
          
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1;
                

    try {
            var id       	=   req.body.edit;
			
            var email       =   rycommon.check_if_value(req,'email','');
            var mobile      =   rycommon.check_if_value(req,'phone','');
				mobile		= 	mobile.trim();
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');



									if(mobile === "") {
										isallgood = 0;
										message = "Mobile is required.";
									}

									if(email === "") {
										isallgood = 0;
										message = "Email is required.";
									}

									if(rycommon.check_if_value(req,'name','') === "") {
										isallgood = 0;
										message = "Name is required.";
									}


				var newvalues 	= 	{
										courseid			:	rycommon.check_if_value(req,'courseid',0),
										coursetitle			:	rycommon.check_if_value(req,'coursetitle',''),
										coursetype			:	rycommon.check_if_value(req,'coursetype','course'),
										name				:	rycommon.check_if_value(req,'name',''),
										email				:	email,
										phone				:	mobile,
										message				:	rycommon.check_if_value(req,'message',''),
										status				:	0
									};

			// insert will be here
				if(isallgood==1)
					{
						const data = new tbl_coursesenquiry(newvalues);
						const dataToSave = data.save();
					   
						var message	=	`
											<div>
												<table>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>For Course</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.coursetitle}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Name</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.name}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Email</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.email}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Phone Number</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.phone}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Message</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.message}</td></tr>
												</table>
											</div>
										`;
					   
						var textmsg = message;
						var htmlmsg = message;
						var test = rycommon.sendemailsendgrid(rycommon.infoemail, `Course Enquiry for ${newvalues.coursetitle}` , textmsg, htmlmsg);
						// var test = rycommon.sendemailsendgrid('rahul@sjain.io', `Course Enquiry for ${newvalues.coursetitle}` , textmsg, htmlmsg);
					   message  =   "Thanks for your message, we will get back to soon.";
					}
			// insert will be here
			
              
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(400).json({status: 150, message: error.message, newvalues: newvalues})
        }
       
    })
// create course contact Enquiry

// create contact Enquiry	
    router.post('/send-contact-us', async(req, res) => {
          
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1;
                

    try {
            var id       	=   req.body.edit;
			
            var fname       =   rycommon.check_if_value(req,'fname','');
            var lname       =   rycommon.check_if_value(req,'lname','');
            var email       =   rycommon.check_if_value(req,'email','');
            var mobile      =   rycommon.check_if_value(req,'phone','');
				mobile		= 	mobile.trim();
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				
				const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

				var newvalues 	= 	{ fname, lname, email, phone: mobile,
										message				:	rycommon.check_if_value(req,'message',''),
										status				:	0
									};
															
									if (!emailRegexp.test(email)) {
										isallgood = 0;	
										message = `Email (${email}) is not valid, Please enter it again.`;
									}

									if(mobile === "") {
										isallgood = 0;
										message = "Mobile is required.";
									}

									if(email === "") {
										isallgood = 0;
										message = "Email is required.";
									}

									if(fname === "") {
										isallgood = 0;
										message = "First Name is required.";
									}
		

		


			// insert will be here
				if(isallgood==1)
					{
						const data = new tbl_contactform(newvalues);
						const dataToSave = data.save();
					   
						var message	=	`
											<div>
												<table>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>First Name</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.fname}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Last Name</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.lname}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Email</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.email}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Phone Number</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.phone}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Message</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.message}</td></tr>
												</table>
											</div>
										`;
					   
						var textmsg = message;
						var htmlmsg = message;
						// var test = rycommon.sendemailsendgrid(rycommon.infoemail, "Contact Enquiry from Website" , textmsg, htmlmsg);
						var test = rycommon.sendemailsendgrid("rahul@sjain.io", "Contact Enquiry from docstainstitute.com/contact-us" , textmsg, htmlmsg);
					   message  =   "Thanks for your message, we will get back to soon.";
					}
			// insert will be here
			
              
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(400).json({status: 150, message: error.message, newvalues: newvalues})
        }
       
    })
// create contact Enquiry
	
// create bookaclass Enquiry	
    router.post('/bookaclass', async(req, res) => { 
   
          
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1;
                

    try {
            var id       	=   req.body.edit;
			
            var email       =   rycommon.check_if_value(req,'email','');
            var mobile      =   rycommon.check_if_value(req,'phonenumber','');
				mobile		= 	mobile.trim();
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');

				var newvalues 	= 	{
										fname				:	rycommon.check_if_value(req,'fname',''),
										lname				:	rycommon.check_if_value(req,'lname',''),
										email				:	email,
										phonenumberCountry	:	rycommon.check_if_value(req,'phonenumberCountry',''),
										phonenumber			:	mobile,
										location			:	rycommon.check_if_value(req,'location',''),
										course				:	rycommon.check_if_value(req,'course',''),
										fordate				:	rycommon.check_if_value(req,'fordate',''),
										participants		:	rycommon.check_if_value(req,'participants',''),
										notes				:	rycommon.check_if_value(req,'notes',''),
										status				:	0
									};
		


			// insert will be here
				if(isallgood==1)
					{
						const data = new tb_bookaclass(newvalues);
					   const dataToSave = data.save();
					   
						var message	=	`
											<div>
												<table>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>First Name</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.fname}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Last Name</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.lname}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Email</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.email}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Phone Number</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.phonenumber}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>location</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.location}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Course</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.course}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Requesting date</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.fordate}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>No: of participants</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.participants}</td></tr>
													<tr><td style='border:1px solid #f5f5f5; padding:5px;'>Additional notes</td><td style='border:1px solid #f5f5f5; padding:5px;'>${newvalues.notes}</td></tr>
												</table>
											</div>
										`;
					   
					   var textmsg = message;
					   var htmlmsg = message;
					   var test = rycommon.sendemailsendgrid(rycommon.infoemail, "Book A class Enquiry" , textmsg, htmlmsg);
					   message  =   "After reviewing your request, we will get back to you. You will receive Login credentials through email.";
					}
			// insert will be here
			
              
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(400).json({status: 150, message: error.message, newvalues: newvalues})
        }
       
    })
// create bookaclass Enquiry

// create request-as-team Enquiry	
    router.post('/requestasteam', async(req, res) => { 
   
          
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1;
                

    try {
            var id       	=   req.body.edit;
			
            var email       =   req.body.email;
            var mobile      =   req.body.phonenumber;
				mobile		= 	mobile.trim();
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');

				var newvalues 	= 	{
										fname				:	req.body.fname,
										lname				: 	req.body.lname,
										email				:	email,
										phonenumberCountry	: 	req.body.phonenumberCountry,
										phonenumber			: 	mobile,
										location			: 	req.body.location,
										course				: 	req.body.course,
										fordate				: 	req.body.fordate,
										participants		:	req.body.participants,
										notes				:	req.body.notes,
										status				:	0
												};
		


			// insert will be here
				if(isallgood==1)
					{
						const data = new tb_bookasteam(newvalues);
					   const dataToSave = data.save();
					   message  =   "After reviewing your request, we will get back to you. You will receive Login credentials through email.";
					}
			// insert will be here
			
              
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(400).json({status: 150, message: error.message, newvalues: newvalues})
        }
       
    })
// create request-as-team Enquiry	


// create career counselling Enquiry	
    router.post('/careercounselling', async(req, res) => { 
   
          
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1;
                

    try {
            var id       	=   req.body.edit;
			
            var email       =   req.body.email;
            var mobile      =   req.body.phonenumber;
				mobile		= 	mobile.trim();
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');

				var newvalues 	= 	{
										fname				:	req.body.fname,
										lname				: 	req.body.lname,
										email				:	email,
										phonenumberCountry	: 	req.body.phonenumberCountry,
										phonenumber			: 	mobile,
										company				: 	req.body.company,
										designation			: 	req.body.designation,
										course				: 	req.body.course,
										notes				:	req.body.notes,
										status				:	0
												};
		


			// insert will be here
				if(isallgood==1)
					{
						const data = new tb_careercounselling(newvalues);
					   const dataToSave = data.save();
					   message  =   "After reviewing your request, we will get back to you. You will receive Login credentials through email.";
					}
			// insert will be here
			
              
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(400).json({status: 150, message: error.message, newvalues: newvalues})
        }
       
    })
// create career counselling Enquiry	

//Get all getbookaclassAll
router.post('/getbookaclassAll', async(req, res) => {
	var sortby			=	rycommon.check_if_value(req,'sortby','');
	var Keyword			=	rycommon.check_if_value(req,'keyword',"");
	var recordsPerPage	=	rycommon.check_if_value(req,'recordsPerPage',2);
	var PageNumber		=	rycommon.check_if_value(req,'PageNumber',1);
		PageNumber--;
			if (PageNumber<0) { PageNumber=0; }
	
	let orderby 	=  { updatedAt: -1 };
		switch(sortby)
			{
				case "z2a":
					orderby 	=  { fname: -1 };
				break;
				case "a2z":
					orderby 	=  { fname: 1 };
				break;
				case "latest":
					orderby 	=  { updatedAt: -1 };
				break;
				case "old":
					orderby 	=  { updatedAt: 1 };
				break;
				default:
					orderby 	=  { updatedAt: -1 };
				break;
			}

		var filterarray = {};

			if(Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.fname = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}

	try
		{	
			const data = await tb_bookaclass.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tb_bookaclass.count(filterarray);
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0 });
		}
    })
//Get all getbookaclassAll

//Get all getbookaclassAll
router.post('/getcourseenqAll', async(req, res) => {
	var sortby			=	rycommon.check_if_value(req,'sortby','');
	var Keyword			=	rycommon.check_if_value(req,'keyword',"");
	var recordsPerPage	=	rycommon.check_if_value(req,'recordsPerPage',2);
	var PageNumber		=	rycommon.check_if_value(req,'PageNumber',1);
		PageNumber--;
			if (PageNumber<0) { PageNumber=0; }
	
	let orderby 	=  { updatedAt: -1 };
		switch(sortby)
			{
				case "z2a":
					orderby 	=  { fname: -1 };
				break;
				case "a2z":
					orderby 	=  { fname: 1 };
				break;
				case "latest":
					orderby 	=  { updatedAt: -1 };
				break;
				case "old":
					orderby 	=  { updatedAt: 1 };
				break;
				default:
					orderby 	=  { updatedAt: -1 };
				break;
			}

		var filterarray = {};

			if(Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.fname = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}

	try
		{	
			const data = await tbl_coursesenquiry.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tbl_coursesenquiry.count(filterarray);
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0 });
		}
    })
//Get all getbookaclassAll



//Get all getbookaclassAll
router.post('/getRequestQuoteAll', async(req, res) => {
	var sortby			=	rycommon.check_if_value(req,'sortby','');
	var Keyword			=	rycommon.check_if_value(req,'keyword',"");
	var recordsPerPage	=	rycommon.check_if_value(req,'recordsPerPage',2);
	var PageNumber		=	rycommon.check_if_value(req,'PageNumber',1);
		PageNumber--;
			if (PageNumber<0) { PageNumber=0; }
	
	let orderby 	=  { updatedAt: 1 };
		switch(sortby)
			{
				case "z2a":
					orderby 	=  { name: -1 };
				break;
				case "a2z":
					orderby 	=  { name: 1 };
				break;
				case "latest":
					orderby 	=  { updatedAt: -1 };
				break;
				case "old":
					orderby 	=  { updatedAt: 1 };
				break;
				default:
					orderby 	=  { updatedAt: -1 };
				break;
			}

		var filterarray = {};

			if(Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.name = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}

	try
		{	
			const data = await tbl_RequestQuote.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tbl_RequestQuote.count(filterarray);
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0 });
		}
    })
//Get all getbookaclassAll

//Get all getcontactfrmAll
router.post('/getcontactfrmAll', async(req, res) => {
	var sortby			=	rycommon.check_if_value(req,'sortby','');
	var Keyword			=	rycommon.check_if_value(req,'keyword',"");
	var recordsPerPage	=	rycommon.check_if_value(req,'recordsPerPage',2);
	var PageNumber		=	rycommon.check_if_value(req,'PageNumber',1);
		PageNumber--;
			if (PageNumber<0) { PageNumber=0; }
	
	let orderby 	=  { updatedAt: -1 };
		switch(sortby)
			{
				case "z2a":
					orderby 	=  { fname: -1 };
				break;
				case "a2z":
					orderby 	=  { fname: 1 };
				break;
				case "latest":
					orderby 	=  { updatedAt: -1 };
				break;
				case "old":
					orderby 	=  { updatedAt: 1 };
				break;
				default:
					orderby 	=  { updatedAt: -1 };
				break;
			}

		var filterarray = {};

			if(Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.fname = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}

	try
		{	
			const data = await tbl_contactform.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tbl_contactform.count(filterarray);
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0 });
		}
    })
//Get all getcontactfrmAll

// update status of bookaclass	
    router.post('/updatestatusbookaclass', async(req, res) => {

	var message = "Something Went Wrong, Please try again later."; 
	var isallgood = 1; 
    try {
            var enqid      	=   req.body.enqid;
            var status    	=   req.body.status;
			// update will be here
				if(isallgood==1)
					{
							var myquery 	=	{ enqid: enqid };
							var newvalues 	= 	{
													status: status
												};
						  tb_bookaclass.updateOne(myquery, newvalues, function(err, res) {
							console.log("1 document updated");
						  });
							message  =   "Category Status Updated successfully.";
					}
			// update will be here
                    return res.status(200).json({status: isallgood, message: message}) 
        }
        catch (error) {
            return res.status(200).json({status: isallgood, message: error.message})
        }
})  
// update status of bookaclass

// update status of bookaclass	
    router.post('/updatestatuscourseenq', async(req, res) => {

	var message = "Something Went Wrong, Please try again later."; 
	var isallgood = 1; 
    try {
            var courseenqid      	=   req.body.courseenqid;
            var status    	=   req.body.status;
			// update will be here
				if(isallgood==1)
					{
							var myquery 	=	{ courseenqid: courseenqid };
							var newvalues 	= 	{
													status: status
												};
						  tbl_coursesenquiry.updateOne(myquery, newvalues, function(err, res) {
							console.log("1 document updated");
						  });
							message  =   "Category Status Updated successfully.";
					}
			// update will be here
                    return res.status(200).json({status: isallgood, message: message}) 
        }
        catch (error) {
            return res.status(200).json({status: isallgood, message: error.message})
        }
})  
// update status of bookaclass

// update status of updatestatusRequestQuote	
    router.post('/updatestatusRequestQuote', async(req, res) => {

	var message = "Something Went Wrong, Please try again later."; 
	var isallgood = 1; 
    try {
            var RequestQuoteID      	=   req.body.RequestQuoteID;
            var status    	=   req.body.status;
			// update will be here
				if(isallgood==1)
					{
							var myquery 	=	{ RequestQuoteID };
							var newvalues 	= 	{
													status: status
												};
						  tbl_RequestQuote.updateOne(myquery, newvalues, function(err, res) {
							console.log("1 document updated");
						  });
							message  =   "Status Updated successfully.";
					}
			// update will be here
                    return res.status(200).json({status: isallgood, message: message}) 
        }
        catch (error) {
            return res.status(200).json({status: isallgood, message: error.message})
        }
})  
// update status of updatestatusRequestQuote

// update status of getcontactfrmAll	
    router.post('/updatestatuscontactfrm', async(req, res) => {

	var message = "Something Went Wrong, Please try again later."; 
	var isallgood = 1; 
    try {
            var conttactenqid	=   req.body.conttactenqid;
            var status    		=	req.body.status;
			// update will be here
				if(isallgood==1)
					{
							var myquery 	=	{ conttactenqid: conttactenqid };
							var newvalues 	= 	{
													status: status
												};
						  tbl_contactform.updateOne(myquery, newvalues, function(err, res) {
							console.log("1 document updated");
						  });
							message  =   "Category Status Updated successfully.";
					}
			// update will be here
                    return res.status(200).json({status: isallgood, message: message}) 
        }
        catch (error) {
            return res.status(200).json({status: isallgood, message: error.message})
        }
})  
// update status of getcontactfrmAll

//Get all tb_bookasteam
router.post('/getbookasteamAll', async(req, res) => {
	var sortby			=	rycommon.check_if_value(req,'sortby','');
	var Keyword			=	rycommon.check_if_value(req,'keyword',"");
	var recordsPerPage	=	rycommon.check_if_value(req,'recordsPerPage',2);
	var PageNumber		=	rycommon.check_if_value(req,'PageNumber',1);
		PageNumber--;
			if (PageNumber<0) { PageNumber=0; }
	
	let orderby 	=  { updatedAt: -1 };
		switch(sortby)
			{
				case "z2a":
					orderby 	=  { fname: -1 };
				break;
				case "a2z":
					orderby 	=  { fname: 1 };
				break;
				case "latest":
					orderby 	=  { updatedAt: -1 };
				break;
				case "old":
					orderby 	=  { updatedAt: 1 };
				break;
				default:
					orderby 	=  { updatedAt: -1 };
				break;
			}

		var filterarray = {};

			if(Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.fname = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}

	try
		{	
			const data = await tb_bookasteam.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tb_bookasteam.count(filterarray);
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0 });
		}
    })
//Get all getbookaclassAll

// update status of bookaclass	
    router.post('/updatestatusbookasteam', async(req, res) => {

	var message = "Something Went Wrong, Please try again later."; 
	var isallgood = 1; 
    try {
            var enqid      	=   req.body.enqid;
            var status    	=   req.body.status;
			// update will be here
				if(isallgood==1)
					{
							var myquery 	=	{ enqid: enqid };
							var newvalues 	= 	{
													status: status
												};
						  tb_bookasteam.updateOne(myquery, newvalues, function(err, res) {
							console.log("1 document updated");
						  });
							message  =   "Category Status Updated successfully.";
					}
			// update will be here
                    return res.status(200).json({status: isallgood, message: message}) 
        }
        catch (error) {
            return res.status(200).json({status: isallgood, message: error.message})
        }
})  
// update status of bookaclass