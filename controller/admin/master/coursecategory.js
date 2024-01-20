const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

// const md5 = require('md5');
// const emailValidator = require('deep-email-validator');

const router = express.Router();

const tb_category = require('../../../model/tb_category.js'); 
const tb_courses  = require('../../../model/tb_courses.js'); 
const rycommon = require("../../../rycommon.js")  

module.exports = router;



// update status of admin users	
    router.post('/updatefeatured', async(req, res) => {
	var message = "Something Went Wrong, Please try again later.";
	var isallgood = 1; 
    try {
            var catid   =	rycommon.check_if_value(req,'catid',0);
            var featured	=   rycommon.check_if_value(req,'featured',0);
			// update will be here	
				if(isallgood==1)
					{
							var myquery 	=	{ catid: catid };
							var newvalues 	= 	{
													featured: featured
												};
						  tb_category.updateOne(myquery, newvalues, function(err, res) {
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
            var catid   =	rycommon.check_if_value(req,'catid',0);
            var status	=   rycommon.check_if_value(req,'status',0);
			// update will be here	
				if(isallgood==1)
					{
							var myquery 	=	{ catid: catid };
							var newvalues 	= 	{
													status: status
												};
						  tb_category.updateOne(myquery, newvalues, function(err, res) {
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

            var catid       	=   req.body.catid;      
			
			var the_data	=	{
				title				:	rycommon.check_if_value(req,'title',0),
				metadescription		:	rycommon.check_if_value(req,'metadescription',''),
				parent				: 	rycommon.check_if_value(req,'parent',0),
				image				: 	rycommon.check_if_value(req,'image',''),
				calendar			: 	rycommon.check_if_value(req,'calendar',''),
				description			: 	rycommon.check_if_value(req,'description','')
			}

	if ( catid===0 || catid==='NEW' )
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new tb_category(the_data);
					   const dataToSave = data.save();
					   message  =   "Category Created successfully.";
					}
			// insert will be here
		} else {
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ catid: catid };
							var newvalues 	= 	the_data;
												
						  tb_category.updateOne(myquery, newvalues, function(err, res) {
							console.log("1 document updated");
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
router.post('/getAllold', async(req, res) => {
	var forparent	=	req.body.forparent;
	
		var filterarray = {};
			filterarray.parent	=	req.body.parent;
				
				if(forparent===1) 
					{
						filterarray.status	=	1;
					}
	try
		{
			const data = await tb_category.find(filterarray);
			res.status(200).json({status:1, message:'List of Category', data: data, par: filterarray});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get all Method

//Get all Method
router.post('/getAll', async(req, res) => {
	var showcoursecount	=	rycommon.check_if_value(req,'showcoursecount',0);
	var noimage			=	rycommon.check_if_value(req,'noimage',0);
	var parent			=	rycommon.check_if_value(req,'parent',0);
	var featured		=	rycommon.check_if_value(req,'featured',0);
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

					

			if (Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.title = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}
			if (parent != '0' || parent !== 0 || parent !== '')
				{
					filterarray.parent = parent; 	
				} else {
					filterarray.parent = 0; 	
				}
			
			if (noimage === 1 || noimage === '1')
				{
					filterarray.image = { '$ne': '' }; 
				} 
				
			if (featured===1) {
				filterarray.featured = 1;
			}	
			
			
			
				// var myquery 	=	{ status: 1 };
							// var newvalues 	= 	{cost: 125};
												
						  // tb_courses.updateOne(myquery, newvalues, function(err, res) {
							// console.log("1 document updated");
						  // });
			
						  


	try
		{	
			const data = await tb_category.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tb_category.count(filterarray);
	
		var coursecount = [];
				 // datacoursecount.push({[dev]: 10});
			if (showcoursecount === 1 || showcoursecount === '1')
				{
					var filterarray = {};
						filterarray.status 		=	1; 
						filterarray.is_deleted	=	1;
						var temp = await tb_courses.aggregate([{"$match": filterarray}]).sortByCount("category"); 
						await temp.forEach(element => {
							// coursecount.push({[element._id]: element.count });
							coursecount[element._id] = element.count;
						});					
				}
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count, noimage: noimage, coursecount: coursecount});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0 });
		}
    })
//Get all Method

//Get Single Method
router.post('/getone', async(req, res) => {
	var catid       =   rycommon.check_if_value(req,'catid',0);
	console.log(catid);
	try
		{
			const data = await tb_category.findOne({catid: catid});
			const coursecount = await tb_courses.count({category: catid});
			var myquery 	=	{ catid: catid };
			tb_category.updateOne(myquery, {view: Number(data.view)+1}, function(err, res) {
				console.log(err);
				console.log(data.view);
				console.log("##");
				console.log(res);
			});
			res.status(200).json({status:1, message:'Detail of Category', data: data, coursecount: coursecount});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	
    


