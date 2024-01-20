const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

// const md5 = require('md5');
// const emailValidator = require('deep-email-validator');

const router = express.Router();

const tbl_accreditations = require('../../../model/tbl_accreditations.js'); 
const rycommon = require("../../../rycommon.js")  

module.exports = router;

// update status of admin users	
    router.post('/updatestatus', async(req, res) => {
	var message = "Something Went Wrong, Please try again later.";
	var isallgood = 1; 
    try {
            var accreditationid   =	rycommon.check_if_value(req,'accreditationid',0);
            var status	=   rycommon.check_if_value(req,'status',0);
			// update will be here	
				if(isallgood==1)
					{
							var myquery 	=	{ accreditationid: accreditationid };
							var newvalues 	= 	{
													status: status
												};
						  tbl_accreditations.updateOne(myquery, newvalues, function(err, res) {
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

            var accreditationid       	=   req.body.accreditationid;      
			
			var the_data	=	{
				title		:	rycommon.check_if_value(req,'title',0),
				image		: 	rycommon.check_if_value(req,'image',''),
				description	: 	rycommon.check_if_value(req,'description','')
			}

	if ( accreditationid===0 || accreditationid==='NEW' )
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new tbl_accreditations(the_data);
					   const dataToSave = data.save();
					   message  =   "Created successfully.";
					}
			// insert will be here
		} else {
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ accreditationid: accreditationid };
							var newvalues 	= 	the_data;
												
						  tbl_accreditations.updateOne(myquery, newvalues, function(err, res) {
							console.log(res);
							console.log("1 document updated");
							console.log(err);
						  });
							message  =   "Updated successfully.";
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

			if (Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.title = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}	

	try
		{	
			const data = await tbl_accreditations.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tbl_accreditations.count(filterarray);
			res.status(200).json({status:1, message:'List of Gallery Photo', data: data, count: count});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0, error: error.message });
		}
    })
//Get all Method

//Get Single Method
router.post('/getone', async(req, res) => {
	var accreditationid       =   rycommon.check_if_value(req,'accreditationid',0);
	console.log(accreditationid);
	try
		{
			const data = await tbl_accreditations.findOne({accreditationid: accreditationid});
			res.status(200).json({status:1, message:'Detail of Category', data: data, accreditationid: accreditationid});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	
    


