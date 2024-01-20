const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

// const md5 = require('md5');
// const emailValidator = require('deep-email-validator');

const router = express.Router();

const tbl_blog_category = require('../../../model/tbl_blog_category.js'); 
const rycommon = require("../../../rycommon.js")  
  
module.exports = router;

// update status of admin users	
    router.post('/updatestatus', async(req, res) => {           
	
	var message = "Something Went Wrong, Please try again later."; 
	
	var isallgood = 1; 


    try {

            var id       	=   req.body.edit;
			var blogcatid  	=	rycommon.check_if_value(req,'blogcatid',0);
			var status  	=	rycommon.check_if_value(req,'status',0);
            
	
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ blogcatid };
							var newvalues 	= 	{
													status
												};
						  tbl_blog_category.updateOne(myquery, newvalues, function(err, res) {
							  if(err) {
								  console.log(err)
							  }
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
   
          
var message = "Something Went Wrong, Please try again later..."; 

var isallgood = 1;
                
     //   console.log(checkifalreadyemail(req.body.email)); 

    try {

            var id       		=   rycommon.check_if_value(req,'id',0);
            var blogcatid       		=   rycommon.check_if_value(req,'blogcatid',0);
            var title       	=   rycommon.check_if_value(req,'title',"");
            var parent       	=   rycommon.check_if_value(req,'parent',0);
            var image       	=   rycommon.check_if_value(req,'image',"");
            var description     =   rycommon.check_if_value(req,'description',"");
            var metadescription     =   rycommon.check_if_value(req,'metadescription',"");
			
			
	if(title.trim()=="") {
		isallgood = 0;
		message  =   "Title is required.";
	}		
			
	if(blogcatid===0 || blogcatid==='0')
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new tbl_blog_category({
							title			:	title.trim(),
							metadescription	:	metadescription,
							description		:	description,
							image			:	image,
							parent			:	parent
						});
					  // const dataToSave = data.save();
					   
					  await data.save()
						.then(item => {
							message  =   "Category Created successfully.";
						})
						.catch(err => {
						  console.log("unable to save to database");
						});
					   
					}
			// insert will be here
		} else {
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ blogcatid: blogcatid };
							var newvalues 	= 	{
													title			:	title.trim(),
													metadescription	:	metadescription,
													description		:	description,
													image			:	image,
													parent			:	parent
												};
												
						 await tbl_blog_category.updateOne(myquery, newvalues, function(err, res) {
							// console.log("1 document updated");
							message  =   "Category Updated successfully.";
						  });
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
	var SortStatus		=	rycommon.check_if_value(req,'SortStatus',3);
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
	
		switch(SortStatus)
			{
				case "1": case 1:
					filterarray.status = 1;
				break;
				case "2": case 2:
					filterarray.status = 0;
				break;
				default:
					orderby 	=  { createdAt: -1 };
				break;
			}

			if(Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.title = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}

	try
		{	
			const data = await tbl_blog_category.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tbl_blog_category.count(filterarray);
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0 });
		}
    })
//Get all Method

//Get Single Method
router.post('/getone4blogcatid', async(req, res) => {
	var blogcatid       =   req.body.blogcatid;
	// console.log(token);
	try
		{
			const data = await tbl_blog_category.findOne({blogcatid: blogcatid});
			res.status(200).json({status:1, message:'Detail of Category', data: data});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	
    


