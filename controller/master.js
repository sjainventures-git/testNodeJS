const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

const md5 = require('md5');
const fs = require('fs');
const router = express.Router();

const tbl_pages	=	require('../model/tbl_pages.js'); 
const rycommon 	=	require("../rycommon.js");

module.exports = router;

	// for all counter
	
	router.get('/allCounter', async(req, res) => {
		var message = "Something Went Wrong, Please try again later.";
		var isallgood = 1;
		  try {
       //      var id			=	rycommon.check_if_value(req,'id',0);
			var allCounter = {};
          
			// code between this thailesh
				
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tb_bookaclass	=	require('../model/tb_bookaclass.js');
					allCounter.tb_bookaclass = await tb_bookaclass.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tb_bookasteam	=	require('../model/tb_bookasteam.js');
					allCounter.tb_bookasteam = await tb_bookasteam.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tb_careercounselling	=	require('../model/tb_careercounselling.js');
					allCounter.tb_careercounselling = await tb_careercounselling.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tb_category	=	require('../model/tb_category.js');
					allCounter.tb_category = await tb_category.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tb_courses	=	require('../model/tb_courses.js');
					allCounter.tb_courses = await tb_courses.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tb_instructure	=	require('../model/tb_instructure.js');
					allCounter.tb_instructure = await tb_instructure.count(filterarray);
				// END FROM HERE
				
				
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tb_student	=	require('../model/tb_student.js');
					allCounter.tb_student = await tb_student.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tb_testimonials	=	require('../model/tb_testimonials.js');
					allCounter.tb_testimonials = await tb_testimonials.count(filterarray);
				// END FROM HERE
				
				
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_blog	=	require('../model/tbl_blog.js');
					allCounter.tbl_blog = await tbl_blog.count(filterarray);
				// END FROM HERE
				
				
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_blog_category	=	require('../model/tbl_blog_category.js');
					allCounter.tbl_blog_category = await tbl_blog_category.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_contactform	=	require('../model/tbl_contactform.js');
					allCounter.tbl_contactform = await tbl_contactform.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_course_instructor	=	require('../model/tbl_course_instructor.js');
					allCounter.tbl_course_instructor = await tbl_course_instructor.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_coursesenquiry	=	require('../model/tbl_coursesenquiry.js');
					allCounter.tbl_coursesenquiry = await tbl_coursesenquiry.count(filterarray);
				// END FROM HERE
				
			
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_freetip	=	require('../model/tbl_freetip.js');
					allCounter.tbl_freetip = await tbl_freetip.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_freetip_category	=	require('../model/tbl_freetip_category.js');
					allCounter.tbl_freetip_category = await tbl_freetip_category.count(filterarray);
				// END FROM HERE
				
				
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_homeslider	=	require('../model/tbl_homeslider.js');
					allCounter.tbl_homeslider = await tbl_homeslider.count(filterarray);
				// END FROM HERE
				
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_renownedclients	=  require('../model/tbl_renownedclients.js');
					allCounter.tbl_renownedclients = await tbl_renownedclients.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_topmessage	=	require('../model/tbl_topmessage.js');
					allCounter.tbl_topmessage = await tbl_topmessage.count(filterarray);
				// END FROM HERE
				
				// START FROM HERE
					var filterarray = {};
						filterarray.status = 1;
					const tbl_webinar	=	require('../model/tbl_webinar.js');
					allCounter.tbl_webinar = await tbl_webinar.count(filterarray);
				// END FROM HERE
				
				
			// code between this thailesh
			
                    return res.status(200).json({status: isallgood, allCounter: allCounter}) 
            
        }
        catch (error) {
            return res.status(400).json({message: error.message})
        }
		
	});
	
	// for all counter

// create admin users
    router.post('/updatepage', async(req, res) => {
		
		var message = "Something Went Wrong, Please try again later.";
		var isallgood = 1;
		
                
    console.log("updating page");

    try {

            var id			=	rycommon.check_if_value(req,'id',0);
            var pagename	=	rycommon.check_if_value(req,'pagename','');
            var pagecontent	=	rycommon.check_if_value(req,'pagecontent','');

	if (id===0)
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new tbl_pages({
							pagename	:	pagename,
							pagecontent	:	pagecontent
						});
					   const dataToSave = data.save();
					   message  =   "User Created successfully.";
					}
			// insert will be here
		} else {
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ pagename: pagename };
							var newvalues 	= 	{
													pagename	:	pagename,
													pagecontent	:	pagecontent
												};
						  tbl_pages.updateOne(myquery, newvalues, function(err, res) {
							console.log("1 document updated");
						  });
							message  =   "User Updated successfully.";
					}
			// update will be here
		}
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(400).json({message: error.message})
        }
       
    })
// create admin users



//Get Single Method
router.post('/getpage', async(req, res) => {
	var pagename	=	rycommon.check_if_value(req,'pagename','');
		try
			{
				const data = await tbl_pages.findOne({pagename: pagename});
				res.status(200).json({status:1, message:'Detail of User', data: data});
			}
		catch(error)
			{
				res.status(200).json({status:0, message: error.message});
			}
    })
//Get Single Method	
    


// upload any File
	router.post('/upload', async(req, res) => {
		// file upload path = /var/www/html/uploads/
	const d = new Date();
	const folderName = d.getFullYear()+'/'+d.getMonth()+'/'+d.getDate();
	// const folderName = d.getFullYear();
	const newpath 	=  "/var/www/html/uploads/";
	const file 		= req.files.file;
	const filename	= file.name;
	
			if (!fs.existsSync(newpath+d.getFullYear())) {
				fs.mkdirSync(newpath+d.getFullYear());
			}
			if (!fs.existsSync(newpath+d.getFullYear()+'/'+d.getMonth())) {
				fs.mkdirSync(newpath+d.getFullYear()+'/'+d.getMonth());
			}
			if (!fs.existsSync(newpath+d.getFullYear()+'/'+d.getMonth()+'/'+d.getDate())) {
				fs.mkdirSync(newpath+d.getFullYear()+'/'+d.getMonth()+'/'+d.getDate());
			}
	
	// var ext	=	filename.extname(filename||'').split('.');
	var ext 	=	filename.split('.').pop();
		console.log(ext);
	const timestamp = Date.now();
 	var rand = Math.floor(  Math.random() * (9999 - 1000) + 1000 );
	
  file.mv(`${newpath}${folderName}/${timestamp}_${rand}.${ext}`, (err) => {
    if (err) {
      res.status(200).send({ status:0, message: "File upload failed", filename: '' });
    }
    res.status(200).send({ status:1, message: "File Uploaded", filename: `${folderName}/${timestamp}_${rand}.${ext}` });
  });
});
// upload any File


// upload image File
	router.post('/uploadImage', async(req, res) => {
		// file upload path = /var/www/html/uploads/
	const d = new Date();
	var allOkay = 1;
	const folderName = d.getFullYear()+'/'+d.getMonth()+'/'+d.getDate();
	// const folderName = d.getFullYear();
	const newpath 	=  "/var/www/html/uploads/";
	const file 		= req.files.file;
	const filename	= file.name;
	
			if (!fs.existsSync(newpath+d.getFullYear())) {
				fs.mkdirSync(newpath+d.getFullYear());
			}
			if (!fs.existsSync(newpath+d.getFullYear()+'/'+d.getMonth())) {
				fs.mkdirSync(newpath+d.getFullYear()+'/'+d.getMonth());
			}
			if (!fs.existsSync(newpath+d.getFullYear()+'/'+d.getMonth()+'/'+d.getDate())) {
				fs.mkdirSync(newpath+d.getFullYear()+'/'+d.getMonth()+'/'+d.getDate());
			}
	
	// var ext	=	filename.extname(filename||'').split('.');
	var ext 	=	filename.split('.').pop();
	
	var showMessage = "File upload failed";
	
		if ( ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png' && ext !== 'gif' )
			{
				allOkay 	 =	0;
				showMessage  =	"Only jpg, png, jpeg or gif Images are allowed.";
			}
	
		console.log(ext);
	const timestamp = Date.now();
 	var rand = Math.floor(  Math.random() * (9999 - 1000) + 1000 );
	
	if (allOkay === 1) {
		file.mv(`${newpath}${folderName}/${timestamp}_${rand}.${ext}`, (err) => {
    if (err) {
      res.status(200).send({ status:0, message: showMessage, filename: '', error: err });
    }
    res.status(200).send({ status:1, message: "File Uploaded", filename: `${folderName}/${timestamp}_${rand}.${ext}` });
  });
	} else {
		res.status(200).send({ status:0, message: showMessage, filename: '' });
	}
	
  
});
// upload image File