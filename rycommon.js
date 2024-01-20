// const infoemail = "rahul@sjain.io";
const infoemail = "enquiry@docstainstitute.com";
function check_if_value(request,indexname,defaultvalue)
	{
		if (typeof request.body[indexname] !== 'undefined' && request.body[indexname] !== 'null')
			{
				return request.body[indexname];
			} else {
				return defaultvalue;
			}
	}
	
	
function basic_authontication_user(req)
	{
		var senddata	=	{}; 
			senddata.username 	=	"";
			senddata.password 	=	"";

		if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1)
			{
				return senddata;
			}
		// verify auth credentials
			const base64Credentials =  req.headers.authorization.split(' ')[1];
			const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
			const [username, password] = credentials.split(':');
				senddata.username 	=	username;
				senddata.password 	=	password;
		return senddata;	
	}
	
function check_if_array_value(array,indexname,defaultvalue)
	{
		if (typeof array[indexname] !== 'undefined')
			{
				return array[indexname];
			} else {
				return defaultvalue;
			}
	}
	
function check_if_logged_in(processwillbehere, ry_usertype)
	{
		var jwttoken	=	check_if_array_value(processwillbehere,'jwt-token');
		var userid 		=	check_if_array_value(processwillbehere,'ry-token1');
		var usertype 	=	check_if_array_value(processwillbehere,'ry-token2');
			if(ry_usertype !== usertype )
				{
					console.log("user type not mathcA");
					return false;
				}
		 const md5 = require('md5');
			if	(jwttoken === md5(`${userid}:${usertype}`)) {
				return true;
			} else {
				console.log("jwttoken not mathcA");
				return false;
			}
	}


function sendemailsendgrid(toemail,subject,textmsg,htmlmsg)
	{
		// using Twilio SendGrid's v3 Node.js Library
		// https://github.com/sendgrid/sendgrid-nodejs  javascript
		
			const sgMail = require('@sendgrid/mail')
			sgMail.setApiKey('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')
			
				const msg	=	{
									to:			toemail, // 'rahul@sjain.io', // Change to your recipient
									from: 		'info@docsta.com', // Change to your verified sender
									subject:	subject, // 'Sending with SendGrid is Fun',
									text: 		textmsg, // 'and easy to do anywhere, even with Node.js',
									html: 		htmlmsg, // '<strong>and easy to do anywhere, even with Node.js</strong>',
								}
								
			sgMail
				.send(msg)
				.then(() => {
					// console.log('Email sent');
					return 	true;
			})
			.catch((error) => {
				console.error(error)
					return 	false;
			})
	}
	
		
// module.exports = { add, sub, mul, div };
module.exports = { check_if_value, sendemailsendgrid, infoemail, check_if_logged_in, basic_authontication_user };
