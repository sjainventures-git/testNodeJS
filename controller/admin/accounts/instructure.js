const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

const md5 = require('md5');
// const qs = require('querystring');
// const emailValidator = require('deep-email-validator');

const router = express.Router();

const fs = require('fs');

const tb_instructure_payout_settings = require('../../../model/tb_instructure_payout_settings.js'); 
const tb_instructure = require('../../../model/tb_instructure.js'); 
const rycommon = require("../../../rycommon.js");

module.exports = router;

function checklogin(username,password){
    return tb_instructure.findOne({email: username,password: password}).then(function(result3){
			return result3;
    });
 }
 
function checkifalreadyemail(email,id){
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		  return tb_instructure.findOne({ _id: { '$ne': id }, email: email}).then(function(result){
				 return result !== null;
			});
	} else {
			return tb_instructure.findOne({ email: email}).then(function(result){
				return result !== null;
			});
	}
    
 }

 function checkifalreadymobile(mobile,id){
	 
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		 return tb_instructure.findOne({ _id: { '$ne': id }, mobile: mobile}).then(function(result2){
			  return result2 !== null;
		 });
	} else {
		 return tb_instructure.findOne({ mobile: mobile}).then(function(result2){
			  return result2 !== null;
		 });
		
	}
  }


// login admin users
router.post('/login', async(req, res) => {
    
    var message 	=	"Something Went Wrong, Please try again later."; 
    var token 		=	0;
	var jwttoken 	=	0;
    var isallgood 	=	1;
    var userdata 	=	[];
    
    try {
            var username    =   req.body.username;
            var password    =   req.body.password;
				password 	=	md5(password);
		
               await checklogin(username,password).then(function(isexist) {
                   if (isexist)
                       {
							isallgood	=	1;
							message		=	"You are logged in successfully.";
							userdata		=	isexist;
                       } else {
							isallgood	=	0;	
							message		=	"Incorrect Username and password.";
                       }
                   });
				   
				if (isallgood === 1) {
					token		=	userdata._id;
					jwttoken	=	md5(`${userdata._id}:admin`);
						if (userdata.status !==1 ) {
								token		=	0;	
								isallgood	=	0;
								message		=	"You are not allowed to login, Please contact us for any Detail.";
							}
				}
				return res.status(200).json({status: isallgood, message: message, token: token, data: userdata, jwttoken: jwttoken });   
        }
        catch (error) {
            return res.status(200).json({status: 0, message: error.message, token: token, data: userdata, jwttoken: jwttoken})
        }
});
// login admin users

// update status of admin users
	
    router.post('/updatestatus', async(req, res) => {           
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1; 


    try {

            var tid       	=   req.body.tid;
            var status    	=   req.body.status;
	
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ tid: tid };
							var newvalues 	= 	{
													status: status
												};
						  tb_instructure.updateOne(myquery, newvalues, function(err, res) {
							// console.log("1 document updated");
						  });
							message  =   "User Updated successfully.";
					}
			// update will be here
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(400).json({message: error.message})
        }

   
})  
// update status of admin users

// check if already email	
    router.post('/checkifalreadyemail', async(req, res) => { 
		var email       =   req.body.emailid;
		var isallgood 	=	0;
		var checkby 	= rycommon.check_if_value(req,'checkby','cfcd208495d565ef66e7dff9f98764da');
		console.log(email);
		var message = "Something Went Wrong, Please try again later."; 
    try {
               await checkifalreadyemail(email, checkby).then(function(isexist) {
                   if (isexist)
                       {
						   isallgood 	=	1;
						   message 			=	"Email ID is already registred with us.";	
                       } else {
						   message 			=	"";	
					   }
                   });
            return res.status(200).json({status: isallgood, message: message})
		}
        catch (error) {
            return res.status(200).json({status: 150, message: message})
        }
	}) 
// check if already email

// upload cv File
	router.post('/uploadcv', async(req, res) => {
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
      res.status(500).send({ status:0, message: "File upload failed", filename: '' });
    }
    res.status(200).send({ status:1, message: "File Uploaded", filename: `${folderName}/${timestamp}_${rand}.${ext}` });
  });
});
// upload cv File

// check if already mobile
    router.post('/checkifalreadymobile', async(req, res) => { 
		var mobileno	=   req.body.mobileno;
			mobileno	= 	mobileno.trim(); mobileno	=	mobileno.replace(' ', ''); mobileno	=	mobileno.replace(' ', '');
			mobileno	= 	mobileno.trim(); mobileno	=	mobileno.replace(' ', ''); mobileno	=	mobileno.replace(' ', '');
			mobileno	= 	mobileno.trim(); mobileno	=	mobileno.replace(' ', ''); mobileno	=	mobileno.replace(' ', '');
		var isallgood 	=	0;
		// var checkby 	= "cfcd208495d565ef66e7dff9f98764da";
		var checkby 	= rycommon.check_if_value(req,'checkby','cfcd208495d565ef66e7dff9f98764da');;
		console.log(mobileno);
		var message = "Something Went Wrong, Please try again later."; 
    try {
               await checkifalreadymobile(mobileno, checkby).then(function(isexist) {
                   if (isexist)
                       {
						   isallgood 	=	1;
						   message 			=	"Mobile is already registred with us.";	
                       } else {
						   message 			=	mobileno;	
					   }
                   });
            return res.status(200).json({status: isallgood, message: message})
		}
        catch (error) {
            return res.status(200).json({status: 150, message: message})
        }
	}) 
// check if already mobile
	
// UPDATE instructor users	
	router.post('/updateprofilesetting', async(req, res) => {
		var message = "Something Went Wrong, Please try again later."; 
		var isallgood = 1;
		
			try {
					var id       	=   rycommon.check_if_value(req,'edit',0);
					
						if(id=="0" || id==0 || id=="")
							{
								// console.log("=>"+id);
								isallgood = 0;
							}
					
					var email       =   rycommon.check_if_value(req,'email',0);
					var mobile      =   rycommon.check_if_value(req,'mobile',0);
					
						mobile		= 	mobile.trim();
						mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
						mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
						mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				   // var password    =   req.body.password;
				   // var conpassword =   req.body.conpassword;
					
						// if(password!=conpassword)
							// {
							   // isallgood = 0;
								   // message = "Password and confirm Password must be same.";  	
							// }
					
						// var password = md5(09564564);


					   await checkifalreadyemail(email, id).then(function(isexist) {
						   if (isexist)
							   {
								   if(isallgood)
										{
											message = "Email Already Exist on our system, Please use a Different Email for Signup.";
										}
								   isallgood = 0;
							   }
						   });
			
						await checkifalreadymobile(mobile, id).then(function(isexist) {
						if (isexist)
							{
							   if(isallgood)
									{
										message = "Mobile Already Exist on our system, Please use a Different Mobile for Signup."; 
									}							
								isallgood = 0;
							}
						});

						var newvalues 	= 	{
												email: email,
												mobile: mobile,
												name:  rycommon.check_if_value(req,'name',""),
												description:  rycommon.check_if_value(req,'description',""),
												language:  rycommon.check_if_value(req,'language',""),
												pan:  rycommon.check_if_value(req,'pan',""),
												tax:  rycommon.check_if_value(req,'tax',""),
												taxtype:  rycommon.check_if_value(req,'taxtype',""),
												youtube:  rycommon.check_if_value(req,'youtube',""),
												linkedin:  rycommon.check_if_value(req,'linkedin',""),
												country:  rycommon.check_if_value(req,'country',0),
												state:  rycommon.check_if_value(req,'state',0),
												city:  rycommon.check_if_value(req,'city',0)
											};
											
											var photo = rycommon.check_if_value(req,'photo',"");
												
												if(photo!="0" && photo!=0 && photo!="")
													{
														newvalues.photo = photo;
														console.log(photo);
													} else {
														console.log("what tiwari");
														console.log(photo);
													}
				
/*
	cvfile: req.body.CVfile,
	teachdone: req.body.teachdone,
	language: req.body.language,
	coursecati: req.body.coursecati,
	name: req.body.name,
	status: 0,
	phonenumberCountry: req.body.phonenumberCountry,
*/	

				if(isallgood==1)
							{
								var myquery 	=	{ _id: id };
									tb_instructure.updateOne(myquery, newvalues, function(err, resu) {});
										message  =   "Your Profile Updated successfully.";
							}
					  
							return res.status(200).json({status: isallgood, message: message, isallgood: isallgood}) 
					
				}
				catch (error) {
					return res.status(200).json({status: 0, message: error.message, newvalues: newvalues})
				}
	}) 
// UPDATE instructor users	
// create instructor users	
    router.post('/signup', async(req, res) => { 
   

          
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1;
                

    try {
            var id       	=   req.body.edit;
			
            var email       =   req.body.emailid;
            var mobile      =   req.body.phonenumber;
				mobile		= 	mobile.trim();
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
				mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', ''); mobile		= 	mobile.replace(' ', '');
           // var password    =   req.body.password;
           // var conpassword =   req.body.conpassword;
			
				// if(password!=conpassword)
					// {
					   // isallgood = 0;
						   // message = "Password and confirm Password must be same.";  	
					// }
			
				var password = md5(09564564);



	if(id===0)
		{
			var checkby = "cfcd208495d565ef66e7dff9f98764da";
		} else {
			var checkby = id;
		} 

               await checkifalreadyemail(email, checkby).then(function(isexist) {
                   if (isexist)
                       {
						   if(isallgood)
								{
									message = "Email Already Exist on our system, Please use a Different Email for Signup.";
								}
                           isallgood = 0;
                       } else {

                       }
                   });
    
                await checkifalreadymobile(mobile, checkby).then(function(isexist) {
                if (isexist)
                    {
					   if(isallgood)
							{
								message = "Mobile Already Exist on our system, Please use a Different Mobile for Signup."; 
							}							
                        isallgood = 0;
                    }
                });

				var newvalues 	= 	{
										password:  password,
										cvfile: req.body.CVfile,
										vidrating: req.body.vidrating,
										teachdone: req.body.teachdone,
										exiaudi: req.body.exiaudi,
										val2std: req.body.val2std,
										namecourse: req.body.namecourse,
										tarstd: req.body.tarstd,
										prereq: req.body.prereq,
										docstahelp: req.body.docstahelp,
										crsready: req.body.crsready,
										language: req.body.language,
										linkedin: req.body.linkedin,
										youtube: req.body.youtube,
										coursecati: req.body.coursecati,
										name: req.body.name,
										email: email,
										status: 0,
										phonenumberCountry: req.body.phonenumberCountry,
										mobile: mobile
												};
		


	if(id===0 || id==='0')
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new tb_instructure(newvalues);
					   const dataToSave = data.save();
					   message  =   "After reviewing your request, we will get back to you. You will receive Login credentials through email.";
					}
			// insert will be here
		} else {
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ _id: id };
												//	password: password
												
						  tb_instructure.updateOne(myquery, newvalues, function(err, res) {
							//console.log("1 document updated");
						  });
							// message  =   "User Updated successfully.";
					}
			// update will be here
		}


            

              
                    return res.status(200).json({status: isallgood, message: message}) 
            
        }
        catch (error) {
            return res.status(400).json({status: 150, message: error.message, newvalues: newvalues})
        }
       
    })
// create admin users

//Get all Method
router.post('/getAllold', async(req, res) => {
	try
		{
			const data = await tb_instructure.find();
			res.status(200).json({status:1, message:'List of Users', data: data});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get all Method

//Get all Method
router.post('/getAll', async(req, res) => {
	var sortStatus		=	rycommon.check_if_value(req,'sortStatus',999999999);
	var sortby			=	rycommon.check_if_value(req,'sortby','');
	var Keyword			=	rycommon.check_if_value(req,'keyword',"");
	var recordsPerPage	=	rycommon.check_if_value(req,'recordsPerPage',10);
	var PageNumber		=	rycommon.check_if_value(req,'PageNumber',1);
		PageNumber--;
			if (PageNumber<0) { PageNumber=0; }
	
	let orderby 	=  { updatedAt: -1 };
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
					orderby 	=  { CreatedAt: -1 };
				break;
			}

		var filterarray = {};

			if(sortStatus != 999999999)
				{
					filterarray.status = sortStatus; 	
				}
			if(Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.name = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}

	try
		{	
			const data = await tb_instructure.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await tb_instructure.count(filterarray);
			res.status(200).json({status:1, message:'List of Instructure', data: data, count: count});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0 });
		}
    })
//Get all Method

//Get Single Method
router.post('/getone', async(req, res) => {
	var tid       =   req.body.tid;
	console.log(tid);
	try
		{
			const data = await tb_instructure.findOne({tid: tid});
			res.status(200).json({status:1, message:'Detail of User', data: data});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	

//Get Single tb_instructure_payout_settings method
router.post('/get_payout_settings', async(req, res) => { 
	var tid       =   req.body.tid;
	try
		{
			const data = await tb_instructure_payout_settings.findOne({tid: tid});
			res.status(200).json({status:1, message:'Detail of Instructor Payout Setting', data: data});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single tb_instructure_payout_settings method

// Update Single tb_instructure_payout_settings method
// UPDATE instructor users	
	router.post('/update_payout_settings', async(req, res) => {
		var message = "Something Went Wrong, Please try again later."; 
		var isallgood = 1;
		
			try {
					var tid       	=   rycommon.check_if_value(req,'edittid',0);
					
						

						var newvalues 	= 	{
												preferred		:	rycommon.check_if_value(req,'preferred',""),
												bank_name		:  	rycommon.check_if_value(req,'bank_name',""),
												bank_branch		:  	rycommon.check_if_value(req,'bank_branch',""),
												bank_acc_no		:  	rycommon.check_if_value(req,'bank_acc_no',""),
												bank_acc_holder	:  	rycommon.check_if_value(req,'bank_acc_holder',""),
												bank_acc_icsc	: 	rycommon.check_if_value(req,'bank_acc_icsc',""),
												paypal			:  	rycommon.check_if_value(req,'paypal',""),
												stripe			:  	rycommon.check_if_value(req,'stripe',""),
												paystack		:  	rycommon.check_if_value(req,'paystack',""),
												rozorpay		: 	rycommon.check_if_value(req,'rozorpay',""),
												gpay			:  	rycommon.check_if_value(req,'gpay',""),
												paytm			:  	rycommon.check_if_value(req,'paytm',"")
											};
	let count = 0;
				if(isallgood==1)
							{
								filterarray = [];
									filterarray.tid = tid;
								count = await tb_instructure_payout_settings.count(filterarray);
									if(count>0)
										{
											console.log("Update me");
											var myquery 	=	{ tid: tid }; tb_instructure_payout_settings.updateOne(myquery, newvalues, function(err, resu) {});
											message  =   "Your Payout Setting Updated successfully.";
										} else {
											console.log("Insert me");
											newvalues.tid = tid;
											const data = new tb_instructure_payout_settings(newvalues);
											const dataToSave = data.save();
											newvalues._id = data._id;
											message  =   "Your Payout Setting Updated successfully.";
										}
											console.log(newvalues);
							}
					  
							return res.status(200).json({status: isallgood, message: message, newvalues: newvalues}) 
					
				}
				catch (error) {
					return res.status(200).json({status: 0, message: error.message, newvalues: newvalues})
				}
	}) 
// UPDATE instructor users	
// Update Single tb_instructure_payout_settings method