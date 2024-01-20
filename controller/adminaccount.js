const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

const md5 = require('md5');
// const emailValidator = require('deep-email-validator');

const router = express.Router();

const adminaccount = require('../model/adminuser.js'); 
const rycommon = require("../rycommon.js");

module.exports = router;

function checklogin(username,password){
    return adminaccount.findOne({email: username,password: password}).then(function(result3){
			return result3;
    });
 }
 
function checkifalreadyemail(email,id){
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		  return adminaccount.findOne({ _id: { '$ne': id }, email: email}).then(function(result){
				 return result !== null;
			});
	} else {
			return adminaccount.findOne({ email: email}).then(function(result){
				return result !== null;
			});
	}
    
 }

 function checkifalreadymobile(mobile,id){
	 
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		 return adminaccount.findOne({ _id: { '$ne': id }, mobile: mobile}).then(function(result2){
			  return result2 !== null;
		 });
	} else {
		 return adminaccount.findOne({ mobile: mobile}).then(function(result2){
			  return result2 !== null;
		 });
		
	}
  }

//check login of admin
router.post('/CheckLogin', async(req, res) => {
	var token       =   rycommon.check_if_value(req,'token',md5('a'));
	
	var isallgood 	=	1;
	
		if(!rycommon.check_if_logged_in(req.headers,'admin')) {
			isallgood 	=	0;
			message 	=	"You are not Login, Please Login again to continue.";
		}
		if (isallgood === 1) {		
			try {
				const data = await adminaccount.findOne({_id: token});
				res.status(200).json({status:isallgood, message:'Login Check for Admin User', data: data});
			} catch(error) {
				res.status(200).json({status:0, message: error.message});
			}
		} else {
			res.status(200).json({status:0, message: message});
		}
    });
//check login of admin


// login admin users
router.post('/loginold', async(req, res) => {
    var message 	=	"Something Went Wrong, Please try again later."; 
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
                       } else {
							isallgood	=	0;	
							message		=	"Incorrect Username and password.";
                       }
							userdata		=	isexist;
                   });
		
              
				return res.status(200).json({status: isallgood, message: message, data: userdata, token: userdata._id, jwttoken: md5(`${userdata._id}:admin`) });  
            
        }
        catch (error) {
            return res.status(400).json({status: 10, message: error.message})
        }

    
});
// login admin users

// login admin users
router.post('/login', async(req, res) => {
    
    var message 	=	"Something Went Wrong, Please try again later."; 
    var jwttoken 	=	0;
    var token 		=	0;
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
					jwttoken	=	md5(`${userdata._id}:admin`);
					token		=	userdata._id;
						if (userdata.status !==1 ) {
								token		=	0;	
								isallgood	=	0;
								message		=	"You are not allowed to login, Please contact us for any Detail.";
							}
				}
				return res.status(200).json({status: isallgood, message: message, token: token, jwttoken: jwttoken, data: userdata });
        }
        catch (error) {
            return res.status(200).json({status: 0, message: error.message, token: token, jwttoken: jwttoken, data: userdata });
        }
});
// login admin users

// update status of admin users
	
    router.post('/updatestatus', async(req, res) => {           
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1; 


    try {

            var aid       	=   req.body.aid;
            var status    	=   req.body.status;
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ aid: aid };
							var newvalues 	= 	{
													status: status
												};
						  adminaccount.updateOne(myquery, newvalues, function(err, res) {
							console.log("1 document updated");
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
// create admin users
    router.post('/create', async(req, res) => { 
   
          
var message = "Something Went Wrong, Please try again later."; 

var isallgood = 1;
                
     //   console.log(checkifalreadyemail(req.body.email)); 

    try {

            var id       	=   req.body.edit;
            var email       =   req.body.email;
            var mobile      =   req.body.mobile;
            var password    =   req.body.password;
            var conpassword =   req.body.conpassword;
			
				if(password!=conpassword)
					{
					   isallgood = 0;
						   message = "Password and confirm Password must be same.";  	
					}
			
				password = md5(password);



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
									message = "Email Already Exist.";
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
								message = "Mobile Already Exist."; 
							}							
                        isallgood = 0;
                    }
                });


	if(id===0)
		{
			// insert will be here
				if(isallgood==1)
					{
						const data = new adminaccount({
							name: req.body.name,
							email: email,
							mobile: mobile,
							password: password
						});
					   const dataToSave = data.save();
					   message  =   "User Created successfully.";
					}
			// insert will be here
		} else {
			// update will be here
			
				if(isallgood==1)
					{
							var myquery 	=	{ _id: id };
							var newvalues 	= 	{
													name: req.body.name,
													email: email,
													mobile: mobile
												};
												
												
									if(conpassword.trim()!=="")
										{
											newvalues.password = password;
										}
												//	password: password
												
						  adminaccount.updateOne(myquery, newvalues, function(err, res) {
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

//Get all Method
router.post('/getAllold', async(req, res) => {
	try
		{
			const data = await adminaccount.find();
			const count = await adminaccount.count();
			res.status(200).json({status:1, message:'List of Users', data: data, count: count});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get all Method

//Get all Method
router.post('/getAll', async(req, res) => {
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
					orderby 	=  { updatedAt: -1 };
				break;
			}

		var filterarray = {};

			if(Keyword != '0' || Keyword !== 0 || Keyword !== '')
				{
					filterarray.name = { $regex: '.*' + Keyword + '.*', $options : 'i' }; 	
				}

	try
		{	
			const data = await adminaccount.find(filterarray).sort(orderby).skip(PageNumber*recordsPerPage).limit(recordsPerPage);
			const count = await adminaccount.count(filterarray);
			res.status(200).json({status:1, message:'List of Blogs', data: data, count: count});
		}
	catch(error)
		{
			res.status(200).json({status:0, message: error.message, data: [], count: 0 });
		}
    })
//Get all Method

//Get Single Method
router.post('/getone', async(req, res) => {
	var token       =   req.body.token;
	console.log(token);
	try
		{
			const data = await adminaccount.findOne({_id: token});
			res.status(200).json({status:1, message:'Detail of User', data: data});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	
    
router.get('/testonly', (req, res) => {
    
    var fname = req.query['fname'];
    var lname = req.query['lname'];

    if(fname==lname)
        {
            res.send('Both are equal.');
        } else {
            res.send('Both are not equal.');
        }
		console.log("hello 2sakfgjh");
        //console.log('Normal password : ', password)
        //console.log('Hashed password : ', md5(password))        
           
        })



//Get by ID Method
router.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})