const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

// const md5 = require('md5');
// const emailValidator = require('deep-email-validator');

const router = express.Router();

const tb_category = require('../../../model/tb_category.js'); 
const rycommon = require("../../../rycommon.js")  
  
module.exports = router;

// update status of admin users	
    router.post('/updatestatus', async(req, res) => {           
	
	var message = "Something Went Wrong, Please try again later."; 
	
	var isallgood = 1; 


    try {

            var id       	=   req.body.edit;
            var status    	=   req.body.status;
			
				if(status==1)
					{
						var newstatus	=	0;
					} else {
						var newstatus	=	1;
					}
	
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ _id: id };
							var newvalues 	= 	{
													status: newstatus
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
   
          
var message = "Something Went Wrong, Please try again later..."; 

var isallgood = 1;
                
     //   console.log(checkifalreadyemail(req.body.email)); 

    try {

            var id       		=   rycommon.check_if_value(req,'id',0);
            var title       	=   rycommon.check_if_value(req,'title',"");
            var parent       	=   rycommon.check_if_value(req,'parent',0);
			
			
	if(title.trim()=="") {
		isallgood = 0;
		message  =   "Title is required.";
	}		
			
	if(id===0 || id==='0')
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new tb_category({
							title	:	title.trim(),
							parent	:	parent
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
							var myquery 	=	{ _id: id };
							var newvalues 	= 	{
													title	:	title,
													parent	:	parent
												};
												
						 await tb_category.updateOne(myquery, newvalues, function(err, res) {
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
	var status	=	rycommon.check_if_value(req,'status',1);
	var selected	=	rycommon.check_if_value(req,'selected',0);
	console.log("11 => "+status);
		var filterarray = {};
			filterarray.parent	=	rycommon.check_if_value(req,'parent',0);
				
				if(status!=='') 
					{
						filterarray.status	=	status;
					}
	try
		{
			const data = await tb_category.find(filterarray);
			res.status(200).json({status:1, message:'List of Blog Category', data: data, par: filterarray});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get all Method

//Get Single Method
router.post('/getone', async(req, res) => {
	var token       =   req.body.token;
	console.log(token);
	try
		{
			const data = await tb_category.findOne({_id: token});
			res.status(200).json({status:1, message:'Detail of Category', data: data});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	
    


