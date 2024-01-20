const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');


const router = express.Router();

const tb_instructure 		=	require('../../../model/tb_instructure.js'); 
const tbl_course_instructor	=	require('../../../model/tbl_course_instructor.js'); 
const rycommon 				=	require("../../../rycommon.js")  

module.exports = router;


// update status of admin users	
    router.post('/updatefeatured', async(req, res) => {
	var message = "Something Went Wrong, Please try again later.";
	var isallgood = 1; 
    try {
            var courseinstid   =	rycommon.check_if_value(req,'courseinstid',0);
            var featured	=   rycommon.check_if_value(req,'featured',0);
			// update will be here	
				if(isallgood==1)
					{
							var myquery 	=	{ courseinstid: courseinstid };
							var newvalues 	= 	{
													featured: featured
												};
						  tbl_course_instructor.updateOne(myquery, newvalues, function(err, res) {
							console.log("1 document updated");
						  });
							message  =   "Category featured Updated successfully.";
					}
			// update will be here
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(200).json({status: isallgood, message: error.message})
        }
})  
// update status of admin users

// update status of admin users	
    router.post('/updatestatus', async(req, res) => {
	var message = "Something Went Wrong, Please try again later.";
	var isallgood = 1; 
    try {
            var courseinstid   =	rycommon.check_if_value(req,'courseinstid',0);
            var status	=   rycommon.check_if_value(req,'status',0);
			// update will be here	
				if(isallgood==1)
					{
							var myquery 	=	{ courseinstid: courseinstid };
							var newvalues 	= 	{
													status: status
												};
						  tbl_course_instructor.updateOne(myquery, newvalues, function(err, res) {
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
// update status of admin users

// create admin users
    router.post('/create', async(req, res) => { 
   
          
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1;
                
     //   console.log(checkifalreadyemail(req.body.email)); 

    try {

            var courseinstid       	=   req.body.courseinstid;      
			
			var the_data	=	{
				courseid	:	rycommon.check_if_value(req,'courseid',0),
				subtitle	:	rycommon.check_if_value(req,'subtitle',''),
				title		:	rycommon.check_if_value(req,'title',0),
				rating		: 	rycommon.check_if_value(req,'rating',4.9),
				image		: 	rycommon.check_if_value(req,'image',''),
				description	: 	rycommon.check_if_value(req,'description','')
			}

	if ( courseinstid===0 || courseinstid==='NEW' )
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new tbl_course_instructor(the_data);
					   const dataToSave = data.save();
					   message  =   "Category Created successfully.";
					}
			// insert will be here
		} else {
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ courseinstid: courseinstid };
							var newvalues 	= 	the_data;
												
						  tbl_course_instructor.updateOne(myquery, newvalues, function(err, res) {
							console.log(res);
							console.log("1 document updated");
							console.log(err);
						  });
							message  =   "Category Updated successfully.";
					}
			// update will be here
		}
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(200).json({status: 0, message: error.message})
        }
       
    })
// create admin users


//Get all Method
router.post('/getAll', async(req, res) => {
	var featured		=	rycommon.check_if_value(req,'featured',0);
	var SortStatus		=	rycommon.check_if_value(req,'SortStatus',3);
	var courseid		=	rycommon.check_if_value(req,'courseid',0);
	var sortby			=	rycommon.check_if_value(req,'sortby','');
	var Keyword			=	rycommon.check_if_value(req,'keyword',"");
	var recordsPerPage	=	rycommon.check_if_value(req,'recordsPerPage',2);
	var PageNumber		=	rycommon.check_if_value(req,'PageNumber',1);
		PageNumber--;
			if (PageNumber<0) { PageNumber=0; }
			
							// var myquery 	=	{ status: 1 };
							// var newvalues 	= 	{ courseid: 0 };
							  // tbl_course_instructor.updateMany(myquery, newvalues, function(err, res) {
								// console.log("1 document updated");
							  // });

	let orderby 	=  { updatedAt: -1 };

		switch(sortby)
			{
				case "z2a":
					orderby 	=  { title: -1 };
				break;
				case "a2z":
					orderby 	=  { title: 1 };
				break;
				case "latest":
					orderby 	=  { updatedAt: -1 };
				break;
				case "old":
					orderby 	=  { updatedAt: 1 };
				break;
				default:
					orderby 	=  { createdAt: -1 };
				break;
			}

	var filterarray = {};
	
		if (courseid !== 'all')
				{
					filterarray.courseid	=	courseid;
				}

		switch (SortStatus)
			{
				case "1": case 1:
					filterarray.status	=	1;
				break;
				case "2": case 2:
					filterarray.status	=	0;
				break;
				default:
				break;
			}

					// filterarray.image = { '$ne': '' }; 	

			if (Keyword !== '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.title = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}
				
			if (featured===1) {
				filterarray.featured = 1;
			}	

	try
		{	
			const data = await tbl_course_instructor.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tbl_course_instructor.count(filterarray);
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count, courseid: courseid});
		} 
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0, error: error.message });
		}
    })
//Get all Method

//Get Single Method
router.post('/getone', async(req, res) => {
	var courseinstid       =   rycommon.check_if_value(req,'courseinstid',0);
	console.log(courseinstid);
	try
		{
			const data = await tbl_course_instructor.findOne({courseinstid: courseinstid});
			res.status(200).json({status:1, message:'Detail of Category', data: data, courseinstid: courseinstid});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	