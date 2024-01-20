const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

// const md5 = require('md5');
// const emailValidator = require('deep-email-validator');

const router = express.Router();

const tbl_webinar = require('../../../model/tbl_webinar.js'); 
const tb_category = require('../../../model/tb_category.js'); 
const rycommon = require("../../../rycommon.js")  
  
module.exports = router;

// update status of admin users	
    router.post('/updatestatus', async(req, res) => {           
	
	var message = "Something Went Wrong, Please try again later."; 
	
	var isallgood = 1; 


    try {

            var webiid	=   req.body.webiid;
            var status  =	req.body.status;			
	
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ webiid: webiid };
							var newvalues 	= 	{
													status: status
												};
						  tbl_webinar.updateOne(myquery, newvalues, function(err, res) {
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
            var title       	=   rycommon.check_if_value(req,'title',"");
            var category       	=   rycommon.check_if_value(req,'category',0);
			
			
	if(title.trim()=="") {
		isallgood	=	0;
		message  	=	"Title is required.";
	}

	if(category == 0 || category == '0' || category == '') {
		isallgood 	=	0;
		message		=	"Please Select the Category.";
	}

		var newvalues	=	{
								title				:	title.trim(),
								requirements		:	rycommon.check_if_value(req,'requirements',''),
								description			:	rycommon.check_if_value(req,'description',''),
								category			:	category,
								subcategory			:	rycommon.check_if_value(req,'subcategory',0),
								addiitrainer		:	rycommon.check_if_value(req,'addiitrainer',''),
								level				:	rycommon.check_if_value(req,'level',''),
								languauge			:	rycommon.check_if_value(req,'languauge',''),
								noofpartic			:	rycommon.check_if_value(req,'noofpartic',''),
								agegroup			:	rycommon.check_if_value(req,'agegroup',''),
								cost				:	rycommon.check_if_value(req,'cost',0),
								discount			:	rycommon.check_if_value(req,'discount',0),
								fromdate			:	rycommon.check_if_value(req,'fromdate',''),
								todate				:	rycommon.check_if_value(req,'todate',''),
								fromtime			:	rycommon.check_if_value(req,'fromtime',''),
								totime				:	rycommon.check_if_value(req,'totime',''),
								before				:	rycommon.check_if_value(req,'before',''), // Have you done this Course before?
								todal_duration		:	rycommon.check_if_value(req,'todal_duration',''), 
								session_duration	:	rycommon.check_if_value(req,'session_duration',''), 
								session_frequency	:	rycommon.check_if_value(req,'session_frequency',''), 
								banner				:	rycommon.check_if_value(req,'banner',''), 
								pre_vid				:	rycommon.check_if_value(req,'pre_vid',''), 
								test_vid			:	rycommon.check_if_value(req,'test_vid',''), 
								key_featu			:	rycommon.check_if_value(req,'key_featu',''), 
								meta_keyword		:	rycommon.check_if_value(req,'meta_keyword',''), 
								meta_description	:	rycommon.check_if_value(req,'meta_description',''),
							};

			
	if(id===0 || id==='0')
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new tbl_webinar(newvalues);
					  // const dataToSave = data.save();
					   
					  await data.save()
						.then(item => {
							message  =   "After reviewing your request, we will get back to you. You will receive an email about the status";
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
						var myquery 	=	{ _id: id };
							await tbl_webinar.updateOne(myquery, newvalues, function(err, res) {
								message  =   "Webinar Updated successfully.";
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
	var sortby		=	rycommon.check_if_value(req,'sortby','');
	var status		=	rycommon.check_if_value(req,'status',0);
	var categorysort	=	rycommon.check_if_value(req,'category',0);
	var subcategory	=	rycommon.check_if_value(req,'subcategory',0);
	
	var Keyword			=	rycommon.check_if_value(req,'keyword',"");

	var recordsPerPage	=	rycommon.check_if_value(req,'recordsPerPage',2);
	var PageNumber		=	rycommon.check_if_value(req,'PageNumber',1);
		PageNumber--;
	
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

			if(Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.title = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}
				
			if(categorysort != '0' && categorysort != '0' && categorysort != '')
				{
					filterarray.category	=	categorysort;
				}
				
			if(subcategory != '0' && subcategory != '0' && subcategory != '')
				{
					filterarray.subcategory	=	subcategory;
				}
				
			if(status != '0' && status != '0' && status != '')
				{
					filterarray.status	=	status;
				}

	try
		{	
			// const tbl_blog_with_category = await tbl_blog.aggregate([{ $lookup: {from : "tb_category", localField: "category", foreignField: "catid", as : "tbl_blog_with_category"}}]); 
			const data = await tbl_webinar.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tbl_webinar.count(filterarray);
			let categorydata = [];
					await data.forEach(element => {
						categorydata.push(Number(element.category));
					});
					
			let category =	[];
			if(categorysort != '0' && categorysort != '0' && categorysort != '')
				{
					category = await tb_category.find({parent: '0'}).select("catid title");
				} else {
					category = await tb_category.find({catid: categorydata}).select("catid title");
				}	
					
			// const data_cati = await tbl_blog_category.find(filterarray);
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count, category: category, filterarray: filterarray});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get all Method

//Get Single Method
router.post('/single', async(req, res) => {
	// var token       =   req.body.token;
	var token		=	rycommon.check_if_value(req,'token',0);
	console.log(token);
	try
		{
			const data = await tbl_blog.findOne({blogid: token});
			const category = await tb_category.find({parent: '0'}).select("catid title");
			var myquery 	=	{ blogid: token };
				 tbl_blog.updateOne(myquery, {$inc: { view: 1 }});
			res.status(200).json({status:1, message:'Detail of Blog', data: data, category: category});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	
    


