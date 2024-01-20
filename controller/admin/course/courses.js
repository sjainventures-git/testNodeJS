const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

// const md5 = require('md5');
// const emailValidator = require('deep-email-validator');

const router = express.Router();

const tb_courses = require('../../../model/tb_courses.js'); 
const tbl_course_instructor = require('../../../model/tbl_course_instructor.js'); 
const tb_category = require('../../../model/tb_category.js'); 
const rycommon = require("../../../rycommon.js")  
  
module.exports = router;

// delete course	
    router.post('/DeleteThisCourse', async(req, res) => {           
	
	var message = "Something Went Wrong, Please try again later."; 
	
	var isallgood = 1; 


    try {

            var courseID     =   req.body.courseID;
			// update will be here
				if(isallgood==1)
					{
						var myquery 	=	{ courseid: courseID };
						var newvalues 	= 	{
												is_deleted: 0
											};
						await tb_courses.updateOne(myquery, newvalues, function(err, res) {
							// console.log("1 document updated");
							message = "Course Deleted.";
						});
					}
			// update will be here
                    return res.status(200).json({status: isallgood, message: message}) 
        }
        catch (error) {
            return res.status(200).json({status: isallgood, message: error.message})
        }
})  
// delete course

// update status of admin users	
    router.post('/updatefeatured', async(req, res) => {

	var message 	= 	"Something Went Wrong, Please try again later."; 
	var isallgood 	=	1;

    try {

            var courseid    =   req.body.courseid;
            var featured    =   req.body.featured;
	
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ courseid: courseid };
							var newvalues 	= 	{
													featured: featured
												};
						  tb_courses.updateOne(myquery, newvalues, function(err, res) {
						//	console.log("1 document updated");
						  });
							message  =   "Category Featured Updated successfully.";
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

            var courseid    =   req.body.courseid;
            var status    	=   req.body.status;
	
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ courseid: courseid };
							var newvalues 	= 	{
													status: status
												};
						  tb_courses.updateOne(myquery, newvalues, function(err, res) {
						//	console.log("1 document updated");
						  });
							message  =   "Category Status Updated successfull s.";
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
            var isadmin       	=   rycommon.check_if_value(req,'isadmin',0);
            var courseid       	=   rycommon.check_if_value(req,'courseid',0);
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
								courseslug			:	rycommon.check_if_value(req,'courseslug','0'),
								rating				:	rycommon.check_if_value(req,'rating',4.9),
								learners			:	rycommon.check_if_value(req,'learners',2900),
								defaultbtn			:	rycommon.check_if_value(req,'defaultbtn',''),
								defaultbtn2			:	rycommon.check_if_value(req,'defaultbtn2',''),
								location			:	rycommon.check_if_value(req,'location',''),

								videoduration		:	rycommon.check_if_value(req,'videoduration','0-1 Hour'),
								topic				:	rycommon.check_if_value(req,'topic',''),
								features			:	rycommon.check_if_value(req,'features',''),
								subtitle			:	rycommon.check_if_value(req,'subtitle',''),
								
								mode				:	rycommon.check_if_value(req,'mode','offline'),
								validity			:	rycommon.check_if_value(req,'validity',''),
								validityin			:	rycommon.check_if_value(req,'validityin',''),
								showdesc2			:	rycommon.check_if_value(req,'showdesc2',''),
								showdesc3			:	rycommon.check_if_value(req,'showdesc3',''),
								showdesc4			:	rycommon.check_if_value(req,'showdesc4',''),
								showdesc5			:	rycommon.check_if_value(req,'showdesc5',''),
								description			:	rycommon.check_if_value(req,'description',''),
								description2		:	rycommon.check_if_value(req,'description2',''),
								description3		:	rycommon.check_if_value(req,'description3',''),
								description4		:	rycommon.check_if_value(req,'description4',''),
								description5		:	rycommon.check_if_value(req,'description5',''),
								include1			:	rycommon.check_if_value(req,'include1',''),
								include2			:	rycommon.check_if_value(req,'include2',''),
								include3			:	rycommon.check_if_value(req,'include3',''),
								include4			:	rycommon.check_if_value(req,'include4',''),
								include5			:	rycommon.check_if_value(req,'include5',''),
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
								yt_vid				:	rycommon.check_if_value(req,'yt_vid',''), 
								test_vid			:	rycommon.check_if_value(req,'test_vid',''), 
								sample_certi		:	rycommon.check_if_value(req,'sample_certi',1), 
								alt_tag				:	rycommon.check_if_value(req,'alt_tag',''), 
								meta_description	:	rycommon.check_if_value(req,'meta_description',''),
							};

		//	console.log(newvalues.targetaud);
	if(courseid===0 || courseid==='0' || courseid==='create')
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new tb_courses(newvalues);
					  // const dataToSave = data.save();
					   
					  await data.save()
						.then(item => {
							if (isadmin===0) {
								message  =   "After reviewing your request, we will get back to you. You will receive an email about the status";
							} else {
								message  =   "Course Created Successfully.";
							}
						//	console.log(message)
						})
						.catch(err => {
						  message = ("unable to save to database");
						  console.log(err);
						});
					   
					}
			// insert will be here
		} else {
			// update will be here
			
				if(isallgood==1)
					{
						var myquery 	=	{ courseid: courseid };
							tb_courses.updateOne(myquery, newvalues, function(err, res) {
								console.log(err);
							});
						message  =   "Course Updated successfully.";
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
router.get('/UpdateWork', async(req, res) => {
	var data = await tb_courses.find({status: 1}).select('view learners');
		var run = 1;
			data.forEach(element => {
				console.log(run++);
					console.log(element);
						var myquery 	=	{courseid: { '$ne' : "0" } } ;
							tb_courses.updateMany(myquery, { is_deleted: 1 }, function(err, res) {
								console.log(err);
							});
			});
				res.status(200).json({status:0, message: data});
})

router.post('/getAll', async(req, res) => {
	
	
	// for any multiple udpate use this	
	
	// for any multiple udpate use this
	
	var ShowTotalCounter		=	rycommon.check_if_value(req,'ShowTotalCounter',0);
	// for multiple filters
	var SendCategoryData		=	rycommon.check_if_value(req,'SendCategoryData',0);
	var SendTopicData			=	rycommon.check_if_value(req,'SendTopicData',0);
	var SendvideodurationData	=	rycommon.check_if_value(req,'SendvideodurationData',0);
	var SendLevelData			=	rycommon.check_if_value(req,'SendLevelData',0);
	var SendLanguaugeData		=	rycommon.check_if_value(req,'SendLanguaugeData',0);
	var SendRatingData			=	rycommon.check_if_value(req,'SendRatingData',0);
	// for multiple filters
	var selecyOnly			=	rycommon.check_if_value(req,'selecyOnly',0);
	var RequiredValueOnly			=	rycommon.check_if_value(req,'RequiredValueOnly',0);
	var SortMode			=	rycommon.check_if_value(req,'SortMode','offline');
	var SortStatus			=	rycommon.check_if_value(req,'SortStatus',1);
	var sortby				=	rycommon.check_if_value(req,'sortby','');
	var sortfeatured		=	rycommon.check_if_value(req,'sortfeatured',0);
	var status				=	rycommon.check_if_value(req,'status',0);
	var categorysort		=	rycommon.check_if_value(req,'category',0);
	var subcategory			=	rycommon.check_if_value(req,'subcategory',0);
	
	var keywordTitle		=	rycommon.check_if_value(req,'keywordTitle',"");
	var Keyword				=	rycommon.check_if_value(req,'keyword',"");
	var keywordDescription	=	rycommon.check_if_value(req,'keywordDescription',"");
	

	var recordsPerPage		=	rycommon.check_if_value(req,'recordsPerPage',2);
	var PageNumber			=	rycommon.check_if_value(req,'PageNumber',1);
		PageNumber--;
	
	let orderby 	=  { updatedAt: -1 };
		switch(sortby)
			{
				case "popular":
					orderby 	=  { view: -1 };
				break;
				case "z2a":
					orderby 	=  { title: -1 };
				break;
				case "a2z":
					orderby 	=  { title: 1 };
				break;
				case "latest":
					orderby 	=  { createdAt: -1 };
				break;
				case "old":
					orderby 	=  { createdAt: 1 };
				break;
				case "highrated":
					orderby 	=  { rating: -1 };
				break;
				default:
					orderby 	=  { updatedAt: -1 };
				break;
			}

		var filterarray = {};
		
			switch(SortStatus)
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
				
			switch(sortfeatured)
				{
					case "1": case 1:
						filterarray.featured	=	1;
					break;
					default:
					break;
				}

			if(SortMode != '0' && SortMode !== 0 && SortMode !== '' && SortMode !== 'all')
				{
					if (SortMode !== "free") {
						filterarray.mode = { '$ne' : "Free" }; 
						filterarray.mode = { '$ne' : "free" }; 
					} else {
						filterarray.mode = "Free";
					}
					
					if (SortMode === "Free") {
						filterarray.mode = "Free"; 
					}
				}
				
			if(Keyword && Keyword != '0' && Keyword !== 0 && Keyword !== '')
				{
					// filterarray.title = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
					
					
    filterarray.$or = [
						// {title : {$ne: { regex: '.*' + Keyword + '.*', $options : 'i' }}},
						// {title : { regex: '.*' + Keyword + '.*', $options : 'i' }},
						{meta_description : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{description : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{description2 : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{description3 : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{description4 : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{description5 : { $regex: '.*' + Keyword + '.*', $options : 'i' }}
					  ];
				}
				
			if(keywordTitle && keywordTitle != '0' && keywordTitle !== 0 && keywordTitle !== '')
				{
					filterarray.title = { $regex: '.*' + keywordTitle + '.*', $options : 'i' };
				}
				
			if(keywordDescription != '0' && keywordDescription !== 0 && keywordDescription !== '')
				{	
					// filterarray.title = { $ne: { $regex: '.*' + keywordTitle + '.*', $options : 'i' } };
					filterarray.$or = [
										{meta_description : { $regex: '.*' + keywordDescription + '.*', $options : 'i' }},
										{description : { $regex: '.*' + keywordDescription + '.*', $options : 'i' }},
										{description2 : { $regex: '.*' + keywordDescription + '.*', $options : 'i' }},
										{description3 : { $regex: '.*' + keywordDescription + '.*', $options : 'i' }},
										{description4 : { $regex: '.*' + keywordDescription + '.*', $options : 'i' }},
										{description5 : { $regex: '.*' + keywordDescription + '.*', $options : 'i' }}
									  ];
				}
			//	console.log(filterarray);
				
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
				
			if(SendvideodurationData != '0' && SendvideodurationData != '0' && SendvideodurationData != '' && SendvideodurationData != '[]')
				{
					filterarray.videoduration	=	{ "$in" : SendvideodurationData} ;
				}
				
			if(SendLevelData != '0' && SendLevelData != '0' && SendLevelData != '' && SendLevelData != '[]')
				{
					filterarray.level	=	{ "$in" : SendLevelData} ;
				} 
				
			if(SendTopicData != '0' && SendTopicData != '0' && SendTopicData != '' && SendTopicData != '[]')
				{
					filterarray.topic	=	{ "$in" : SendTopicData} ;
				}
				
			if(SendLanguaugeData != '0' && SendLanguaugeData != '0' && SendLanguaugeData != '' && SendLanguaugeData != '[]')
				{
					filterarray.languauge	=	{ "$in" : SendLanguaugeData} ;
				} 
				
			if(SendRatingData != '0' && SendRatingData != '0' && SendRatingData != '' && SendRatingData != '[]')
				{
					filterarray.rating	=	{ "$gte" : SendRatingData} ;
				} 

			if(SendCategoryData != '0' && SendCategoryData != '0' && SendCategoryData != '' && SendCategoryData != '[]')
				{
					filterarray.category	=	{ "$in" : SendCategoryData} ;
				} 
				
				// console.log(filterarray);
				
	try
		{
			// tbl_webinar const tbl_blog_with_category = await tbl_blog.aggregate([{ $lookup: {from : "tb_category", localField: "category", foreignField: "catid", as : "tbl_blog_with_category"}}]); 
			
		//	console.log(filterarray);
			let data =	[];
				
				
				filterarray.is_deleted	=	1;
				
				data = await tb_courses.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
				
				if(RequiredValueOnly != '0' && RequiredValueOnly != '0' && RequiredValueOnly != '' && RequiredValueOnly === 1) {
					data = await tb_courses.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage).select(' courseid meta_keyword title meta_description courseslug banner');
				} else {
					data = await tb_courses.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
				}
				
			
			const count = await tb_courses.count(filterarray);
			// let categorydata = [];
					// await data.forEach(element => {
						// categorydata.push(Number(element.category));
					// });
					
					category = await tb_category.find({parent: '0'}).select("catid title");
			// let category =	[];
			// if(categorysort != '0' && categorysort != '0' && categorysort != '')
				// {
				// } else {
					// category = await tb_category.find({catid: categorydata}).select("catid title");
				// }	
					
			// const data_cati = await tbl_blog_category.find(filterarray);
			
			var AllCourseCounter = {};
				if (ShowTotalCounter === 1) { }
var filterarray2 = {};
	filterarray2.status	=	1;
	filterarray2.is_deleted	=	1;
	
	
			if(SortMode != '0' && SortMode !== 0 && SortMode !== '' && SortMode !== 'all')
				{
					if (SortMode !== "free") {
						filterarray2.mode = { '$ne' : "Free" }; 
						filterarray2.mode = { '$ne' : "free" }; 
					} else {
						filterarray2.mode = "Free";
					}
					
					if (SortMode === "Free") {
						filterarray2.mode = "Free"; 
					}
				}
	
AllCourseCounter.courses = await tb_courses.count(filterarray2);

AllCourseCounter.FreeTotalView 		=	0; 
AllCourseCounter.AllTotalView 		=	0; 
AllCourseCounter.FreeTotalLearners 	=	0; 
AllCourseCounter.AllTotalLearners 	=	0; 
     
var filterarray2 = {};
	filterarray2.status	=	1;
	filterarray2.is_deleted	=	1;



	
await tb_courses.aggregate(
    [
	  { $match: filterarray2 },
      {
        $group: {
          _id: null,
		   view_total: {
            $sum: "$view"
          },
		  learners_total: {
            $sum: "$learners"
          }
        }
      }
    ],
    function(err, result) {
      if (err) {
		 console.log(err);
        // res.send(err);
      } else {
		  
			if (result.length>0)
				{
					AllCourseCounter.AllTotalView 		=	result[0].view_total;   
					AllCourseCounter.AllTotalLearners 	=	result[0].learners_total;   
				}
		// AllCourseCounter.AllTotal = result[0];
      }
    }
  );
  
var filterarray3 = {};
	filterarray3.status	=	1;
	filterarray3.is_deleted	=	1;
  
  filterarray3.mode = { $regex: '.*' + "free" + '.*', $options : 'i' };
  
  
  await tb_courses.aggregate(
    [
	  { $match: filterarray3 },
      {
        $group: {
          _id: null,
		   view_total: {
            $sum: "$view"
          },
		  learners_total: {
            $sum: "$learners"
          }
        }
      }
    ],
    function(err, result) {
      if (err) {
		 console.log(err);
        // res.send(err);
      } else {
			if (result.length>0)
				{
					AllCourseCounter.FreeTotalView 		=	result[0].view_total;
					AllCourseCounter.FreeTotalLearners 	=	result[0].learners_total;
				}
        // AllCourseCounter.FreeTotal = result[0];
      }
    }
  );
						
				
			
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count, category: category, filterarray: filterarray, AllCourseCounter: AllCourseCounter});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message});
		}
    })
//Get all Method


// Get all Method for XML file
router.get('/getAllJSON', async(req, res) => {
	let orderby 	=  { title: 1 };
		try
			{
				let data =	[];
				var filterarray = {};
				filterarray.status		=	1;
				filterarray.is_deleted	=	1;
				data = await tb_courses.find(filterarray).sort(orderby).skip(0).limit(500).select(' courseid title  courseslug banner updatedAt');
			res.status(200).json({status:1, message:'List of Course for JSON', data: data });
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message});
		}
    })
// Get all Method for XML file

// ########################################################################### // Methods for Chat Boats

	// get all course here
		router.post('/chatboat/all', async(req, res) => {
			var userAuth	=	rycommon.basic_authontication_user(req);
			let orderby 	=  { title: 1 };
			var sortby		=	rycommon.check_if_value(req,'sortby','');
			var titleOnly	=	rycommon.check_if_value(req,'title',0);
			
			
		switch(sortby)
			{
				case "popular":
					orderby 	=  { view: -1 };
				break;
				case "z2a":
					orderby 	=  { title: -1 };
				break;
				case "a2z":
					orderby 	=  { title: 1 };
				break;
				case "latest":
					orderby 	=  { createdAt: -1 };
				break;
				case "old":
					orderby 	=  { createdAt: 1 };
				break;
				case "highrated":
					orderby 	=  { rating: -1 };
				break;
				default:
					orderby 	=  { title: -1 };
				break;
			}
			
			let data =	[];
			var filterarray = {};
			
			var catid	=	rycommon.check_if_value(req,'catid',0);
			var page	=	rycommon.check_if_value(req,'page',1);
			const limit	=	rycommon.check_if_value(req,'limit',50);
			const Keyword	=	rycommon.check_if_value(req,'keyword', '');
				page = Number(page);
			page--;
				if(page<0) {
					page = 0;
				}
				
				filterarray.status		=	1;
				filterarray.is_deleted	=	1;
				
			if (Keyword !== '') {
				filterarray.$or = [
						{title : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{meta_description : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{description : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{description2 : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{description3 : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{description4 : { $regex: '.*' + Keyword + '.*', $options : 'i' }},
						{description5 : { $regex: '.*' + Keyword + '.*', $options : 'i' }}
				];
			}	
					  
					if (catid !== 0) {
						filterarray.category = catid;
					}
						
						console.log(filterarray);

					try
						{
								if (userAuth.username === 'jitesh' && userAuth.password === 'Pace2012#')
									{
										// actual Data will be here
			let selectOnly = ' -_id courseid validityin validity view courseslug level title meta_description rating banner updatedAt ';							
					if (titleOnly === 1 || titleOnly === '1') {
						selectOnly = ' -_id courseid title ';	
					}
										
data = await tb_courses.find(filterarray).sort(orderby).skip(Number(page)*limit).limit(limit).select(selectOnly);
										const count = await tb_courses.count(filterarray);
										const totalPage = Math.ceil(count/limit);
										res.status(200).json({status:1, totalPage, count: count, page: page+1, currentPage: data.length, message:'List of Courses', data: data });
										// actual Data will be here// actual Data will be here
										
									} else {
										res.status(200).json({status:0, count: 0,  page: 0, message:'Incorrect Authorization.', data: data });
									}
						}
							catch(error)
								{
									res.status(200).json({status:0, count: 0, message: error.message});
								}
			});
	// get all course here
	
	
	// get all category here
		router.post('/chatboat/categories', async(req, res) => {
			var userAuth	=	rycommon.basic_authontication_user(req);
			let orderby 	=  { title: 1 };
			let data =	[];
			var filterarray = {};
				filterarray.status		=	1;
				filterarray.parent		=	0;
				
					try
						{
								if (userAuth.username === 'jitesh' && userAuth.password === 'Pace2012#')
									{
										// actual Data will be here
										
data = await tb_category.find(filterarray).sort(orderby).skip(0).limit(1000).select(' -_id catid  title image updatedAt ');
										
										const count = await tb_category.count(filterarray).sort(orderby).skip(0).limit(1000);
										
										
	var coursecount = [];
				
		var filterarray = {};
			filterarray.status 		=	1; 
			filterarray.is_deleted	=	1;
			var temp = await tb_courses.aggregate([{"$match": filterarray}]).sortByCount("category"); 
							
							
										
				res.status(200).json({status:1, count, message:'List of Categories', data: data, CourceCouter: temp });
										// actual Data will be here// actual Data will be here
										
									} else {
										res.status(200).json({status:0, count: 0, message:'Incorrect Authorization.', data: data });
									}
						}
							catch(error)
								{
									res.status(200).json({status:0, count: 0, message: error.message});
								}
			});
	// get all category here
	
	// get course faqs details here
		router.post('/chatboat/course/faqs', async(req, res) => {


	const tbl_faqs = require('../../../model/tbl_faqs.js'); 

			var userAuth	=	rycommon.basic_authontication_user(req);
			var courseid	=	rycommon.check_if_value(req,'courseid',0);
			var courseslug	=	rycommon.check_if_value(req,'courseslug','');
			
			var page	=	rycommon.check_if_value(req,'page',1);
			const limit	=	rycommon.check_if_value(req,'limit',50);
				page = Number(page);
			page--;
				if(page<0) {
					page = 0;
				}

			let data =	{};
				try
					{

						if (userAuth.username === 'jitesh' && userAuth.password === 'Pace2012#')
							{
								// actual Data will be here
								
								var filterarray = {};
								filterarray.status		=	1;
								if (courseid !== 0) {
									filterarray.courseid		=	courseid;
									filterarray.courseslug		=	courseslug;
									filterarray.status	=	1;
									filterarray.is_deleted	=	0;
									data = await tb_courses.find(filterarray).select("-_id courseid  title");
								}
								
								
								
								
									
								var filterarray = {};
									filterarray.status		=	1;
									// filterarray.courseid		=	data[0].courseid;
		var faqs = await tbl_faqs.find(filterarray).select("-_id fagid title description").skip(Number(page)*limit).limit(limit);
		var totalfaqs = await tbl_faqs.count(filterarray);
								
								
									
										
									
	res.status(200).json({
		status:1, 
		message:'Course Details Data',
		data: data[0],
		totalfaqs,
		page: page+1,
		faqs,
	});
			
								 

								// actual Data will be here
								
							} else {
								res.status(200).json({status:0, message:'Incorrect Authorization.', data: data });
							}

				}
					catch(error)
						{
							res.status(200).json({status:0, message: error.message});
						}
			});
	// get course faqs details here
	
	// get course details here
		router.post('/chatboat/details', async(req, res) => {


	const tbl_faqs = require('../../../model/tbl_faqs.js'); 

			var userAuth	=	rycommon.basic_authontication_user(req);
			var courseid	=	rycommon.check_if_value(req,'courseid',0);
			var courseslug	=	rycommon.check_if_value(req,'courseslug','');

			let data =	{};
				try
					{

						if (userAuth.username === 'jitesh' && userAuth.password === 'Pace2012#')
							{
								
								// actual Data will be here
								
								var filterarray = {};
								filterarray.status		=	1;
								filterarray.courseslug		=	courseslug;
								filterarray.courseid		=	courseid;
								filterarray.is_deleted	=	1;
								data = await tb_courses.find(filterarray).select("-_id rating level courseid validity validityin level category title banner meta_description description description2 description3 description4 description5 ");
								
								if(data.length>0) {
									
									
									
								var filterarray = {};
									filterarray.catid		=	data[0].category;
								
								var category = await tb_category.find(filterarray).select("-_id catid title metadescription image");
								
								var filterarray = {};
									filterarray.courseid		=	data[0].courseid;
								var faqs = await tbl_faqs.find(filterarray).select("-_id fagid title description");
								
								
									
										if(category.length>0) {
											category = category[0];
										}
									
			res.status(200).json({status:1, message:'Course Details Data', data: data[0], category, faqs });
			
								} else {
									res.status(200).json({status:1, message:'No Course Dta with your Searc., Details Data', data: data });
								}

								// actual Data will be here
								
							} else {
								res.status(200).json({status:0, message:'Incorrect Authorization.', data: data });
							}

				}
					catch(error)
						{
							res.status(200).json({status:0, message: error.message});
						}
			});
	// get course details here
	
	
	// get all faqs here
		router.post('/chatboat/faqs', async(req, res) => {
			var userAuth	=	rycommon.basic_authontication_user(req);
			let orderby 	=  { title: 1 };
			let data =	[];
			var filterarray = {};
				filterarray.status		=	1;
				filterarray.parent		=	0;
				
					try
						{
								if (userAuth.username === 'jitesh' && userAuth.password === 'Pace2012#')
									{
										// actual Data will be here
										
										const tbl_faqs = require('../../../model/tbl_faqs.js'); 
				var filterarray = {};
					filterarray.courseid		=	0;
				data = await tbl_faqs.find(filterarray).select("-_id fagid title description");
										
				const count = await tbl_faqs.count(filterarray);
										
										res.status(200).json({status:1, count, message:'List of Faqs', data: data });
										// actual Data will be here// actual Data will be here
										
									} else {
										res.status(200).json({status:0, count: 0, message:'Incorrect Authorization.', data: data });
									}
						}
							catch(error)
								{
									res.status(200).json({status:0, count: 0, message: error.message});
								}
			});
	// get all faqs here
// ########################################################################### // Methods for Chat Boats


//Get Single Method
router.post('/getOne', async(req, res) => {
	// var token       =   req.body.token;
	var courseid		=	rycommon.check_if_value(req,'courseid',0);
	// console.log(courseid);
	try
		{
			const data = await tb_courses.findOne({courseid: courseid});
			const category = await tb_category.findOne({catid: data.category}).select("catid title");	
			var myquery 	=	{ courseid: courseid };
			tb_courses.updateOne(myquery, {view: Number(data.view)+1}, function(err, res) {
				// console.log(data.view);
			});
			res.status(200).json({status:1, message:'Detail of Blog', data: data, category: category});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	

//Get Single Method
router.post('/getOnebySlug', async(req, res) => {
	// var token       =   req.body.token;
	var courseslug		=	rycommon.check_if_value(req,'courseslug',0);
	// console.log(courseid);
	try
		{
			const data = await tb_courses.findOne({courseslug: courseslug, status: 1, is_deleted: 1});
			const category = await tb_category.findOne({catid: data.category}).select("catid title");	
			var myquery 	=	{ courseslug: courseslug };
			tb_courses.updateOne(myquery, {view: Number(data.view)+1}, function(err, res) {
				// console.log(data.view);
			});
			const instructors	=	await tbl_course_instructor.find({courseid: data.courseid, status:  1});
			res.status(200).json({status:1, message:'Detail of Blog', data: data, category: category, instructors: instructors});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	
    
// get Filters
	router.post('/getFilterOptions', async(req, res) => {
		
		var SortMode			=	rycommon.check_if_value(req,'SortMode',0);
				
							
		var filterarray = {};
			filterarray.status = 1; 
			filterarray.is_deleted	=	1;
				if(SortMode != '0' && SortMode !== 0 && SortMode !== '' && SortMode !== 'all') 
					{
						filterarray.mode = { $regex: '.*' + SortMode + '.*', $options : 'i' }; 
					}
					
		var rating = {};
		var sendrating = {};

			filterarray.rating	=	{ "$gte" : 4.5} ;
		sendrating.up45 =	await tb_courses.count(filterarray);
		
			filterarray.rating	=	{ "$gte" : 4.0} ;
		sendrating.up40 =	await tb_courses.count(filterarray);
		
			filterarray.rating	=	{ "$gte" : 3.5} ;
		sendrating.up35 =	await tb_courses.count(filterarray);

			filterarray.rating	=	{ "$gte" : 3.0} ;
		sendrating.up30 =	await tb_courses.count(filterarray);
		
			
			
						

		var filterarray = {};
			filterarray.status = 1; 
				if(SortMode != '0' && SortMode !== 0 && SortMode !== '' && SortMode !== 'all') 
					{
						filterarray.videoduration = { '$ne': '' } 
						filterarray.videoduration = { '$ne': null } 
						filterarray.mode = { $regex: '.*' + SortMode + '.*', $options : 'i' }; 
					}
						var videoduration	=	await tb_courses.aggregate([{"$match": filterarray}]).sortByCount("videoduration"); 
						
		var filterarray = {};
			filterarray.status = 1; 
				if(SortMode != '0' && SortMode !== 0 && SortMode !== '' && SortMode !== 'all') 
					{
						// filterarray.topic = [{ '$ne': ' ' }, { '$ne': null } , { '$ne': '' }] 
						filterarray.mode = { $regex: '.*' + SortMode + '.*', $options : 'i' }; 
					}
						var topic 			=	await tb_courses.aggregate([{"$match": filterarray}]).sortByCount("topic"); 
						 
						
		var filterarray = {};
			filterarray.status = 1; 
				if(SortMode != '0' && SortMode !== 0 && SortMode !== '' && SortMode !== 'all') 
					{
						filterarray.mode = { $regex: '.*' + SortMode + '.*', $options : 'i' }; 
					}
						var level 			=	await tb_courses.aggregate([{"$match": filterarray}]).sortByCount("level");

	
		var filterarray = {};
			filterarray.status = 1; 
				if(SortMode != '0' && SortMode !== 0 && SortMode !== '' && SortMode !== 'all') 
					{
						filterarray.mode = { $regex: '.*' + SortMode + '.*', $options : 'i' }; 
					}
						var languauge 			=	await tb_courses.aggregate([{"$match": filterarray}]).sortByCount("languauge");						
			
		var filterarray = {};
			filterarray.status = 1; 
				if(SortMode != '0' && SortMode !== 0 && SortMode !== '' && SortMode !== 'all') 
					{
						filterarray.mode = { $regex: '.*' + SortMode + '.*', $options : 'i' }; 
					}
						var category		=	await tb_courses.aggregate([{"$match": filterarray}]).sortByCount("category"); 
			
		var filterarray = {};
			filterarray.status = 1; 
				if(SortMode != '0' && SortMode !== 0 && SortMode !== '' && SortMode !== 'all') 
					{
						filterarray.mode = { $regex: '.*' + SortMode + '.*', $options : 'i' }; 
					}
						var features		=	await tb_courses.aggregate([{"$match": filterarray}]).sortByCount("features"); 
			
		var filterarray = {};
			filterarray.status = 1; 
				if(SortMode != '0' && SortMode !== 0 && SortMode !== '' && SortMode !== 'all') 
					{
						filterarray.mode = { $regex: '.*' + SortMode + '.*', $options : 'i' }; 
					}
						var subtitle		=	await tb_courses.aggregate([{"$match": filterarray}]).sortByCount("subtitle"); 

			res.status(200).json({status:1, message:'Detail of Filters', rating: rating, sendrating: sendrating, category: category, topic: topic, level: level, languauge: languauge, features: features, videoduration: videoduration, subtitle: subtitle});	
    })
// get Filters
	
	


