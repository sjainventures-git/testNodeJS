const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

// const md5 = require('md5');
// const emailValidator = require('deep-email-validator');

const router = express.Router();

const tbl_blog = require('../../../model/tbl_blog.js'); 
const tbl_blog_category = require('../../../model/tbl_blog_category.js'); 
const rycommon = require("../../../rycommon.js")  
  
module.exports = router;

// update status of admin users	
    router.post('/updatestatus', async(req, res) => {           
	
	var message = "Something Went Wrong, Please try again later."; 
	
	var isallgood = 1; 


    try {

            var blogid	=	req.body.blogid;
            var status  =	req.body.status;
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ blogid: blogid };
							var newvalues 	= 	{
													status: status
												};
						  tbl_blog.updateOne(myquery, newvalues, function(err, res) {
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
		
		var message 	=	"Something Went Wrong, Please try again later..."; 
		var isallgood 	=	1;
     //   console.log(checkifalreadyemail(req.body.email)); 564
    try {
            var id       		=   rycommon.check_if_value(req,'id',0);
            var blogid       	=   rycommon.check_if_value(req,'blogid',0);
            var title       	=   rycommon.check_if_value(req,'title',"");
            var slug       		=   rycommon.check_if_value(req,'slug',title);
            var image       	=   rycommon.check_if_value(req,'image',"");
            var parent       	=   rycommon.check_if_value(req,'parent',0);
            var category       	=   rycommon.check_if_value(req,'category',0);
            var subcategory     =   rycommon.check_if_value(req,'subcategory',0);
			var description		=	rycommon.check_if_value(req,'description',"");
			var metadescription	=	rycommon.check_if_value(req,'metadescription',"");

	if(title.trim()=="") {
		isallgood = 0;
		message  =   "Title is required.";
	}

	if(category == 0 || category == '0' || category == '') {
		isallgood = 0;
		message  =   "Please Select the Category.";
	}

		var newvalues	=	{
								title		:	title.trim(),
								slug		:	slug.trim(),
								image		:	image,
								description	:	description,
								metadescription	:	metadescription,
								category	:	category,
								subcategory	:	subcategory
							};

			console.log(` blogid ${blogid}`);
	if(blogid===0 || blogid==='0')
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new tbl_blog(newvalues);
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
						var myquery 	=	{ blogid: blogid };
							await tbl_blog.updateOne(myquery, newvalues, function(err, res) {
								message  =   "Category Updated successfully.";
							}).clone();
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
	var sortby			=	rycommon.check_if_value(req,'sortby','');
	var status			=	rycommon.check_if_value(req,'SortStatus',0);
	var categorysort	=	rycommon.check_if_value(req,'category',0);
	var subcategory		=	rycommon.check_if_value(req,'subcategory',0);

	var Keyword			=	rycommon.check_if_value(req,'keyword',"");

	var recordsPerPage	=	rycommon.check_if_value(req,'recordsPerPage',10);
	var PageNumber		=	rycommon.check_if_value(req,'PageNumber',1);
		PageNumber--;

	let orderby 	=  { updatedAt: -1 };
		switch(sortby)
			{
				case "trending":
					orderby 	=  { view: -1 };
				break;
				case "featured":
					orderby 	=  { updatedAt: -1 };
				break;
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
					switch(status) {
						case "1": case 1:
							filterarray.status	=	1;
						break;
						case "2": case 2:
							filterarray.status	=	0;
						break;
						default:
						break;
					}
				}

	try
		{	
			// const tbl_blog_with_category = await tbl_blog.aggregate([{ $lookup: {from : "tbl_blog_category", localField: "category", foreignField: "catid", as : "tbl_blog_with_category"}}]); 
			const data 	=	await tbl_blog.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count	=	await tbl_blog.count(filterarray);
			let categorydata = [];
					await data.forEach(element => {
						categorydata.push(Number(element.category));
					});
					
		
					
			let category =	[];
			if(categorysort != '0' && categorysort != '0' && categorysort != '')
				{
					category = await tbl_blog_category.find({status: 1}).select("blogcatid title image metadescription");
				} else {
					category = await tbl_blog_category.find({status: 1}).select("blogcatid title image metadescription");
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
router.post('/GetBlogDetail', async(req, res) => {
	// var token       =   req.body.token;
	var blogid		=	rycommon.check_if_value(req,'blogid',0);
	// console.log(token);
	try
		{
			const data = await tbl_blog.findOne({blogid: blogid});
			// const category = await tbl_blog_category.find({parent: '0'}).select("blogcatid title");
			
			const category = await tbl_blog_category.find({status: 1}).select("blogcatid title image metadescription");
			
			var myquery 	=	{ blogid: blogid };
				 tbl_blog.updateOne(myquery, {$inc: { view: 1 }});
			res.status(200).json({status:1, message:'Detail of Blog', data: data, category: category});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	

//Get Single Method
router.post('/GetBlogBySlug', async(req, res) => {
	// var token       =   req.body.token;
	var slug		=	rycommon.check_if_value(req,'token',0);
	// console.log(token);
	try
		{
			const data = await tbl_blog.findOne({slug: slug});
			// const category = await tbl_blog_category.find({parent: '0'}).select("blogcatid title");
			const category = await tbl_blog_category.find({status: 1}).select("blogcatid title image metadescription");
			var myquery 	=	{ slug: slug };
				 tbl_blog.updateOne(myquery, {$inc: { view: 1 }});
			res.status(200).json({status:1, message:'Detail of Blog', data: data, category: category});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	
    


