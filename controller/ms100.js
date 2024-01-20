const { DiffieHellmanGroup } = require('crypto');
const e = require('express');
const express = require('express');

const md5 = require('md5');

const router = express.Router();

module.exports = router;

const tbl_WebinarJoined		=	require('../model/tbl_WebinarJoined.js'); 
const tbl_webinarRecordings	=	require('../model/tbl_webinarRecordings.js'); 

// const http = require('http'); // or 'https' for https:// URLs
const https = require('https'); // or 'https' for https:// URLs
const fs = require('fs');


router.post('/webhook', async(req, res) => {
	try
		{
			//  "name": "WebinarID'.$wid.'",
				console.log(req.body.type);
				if (req && req.body && req.body.type && req.body.type === 'recording.success') {

const data = await new tbl_webinarRecordings({
							room_name			: 	req.body.data.room_name,
							session_id			: 	req.body.data.session_id,
							size				: 	req.body.data.size,
							duration			: 	req.body.data.duration,
							session_started_at	: 	req.body.data.session_started_at,
							session_stopped_at	: 	req.body.data.session_stopped_at,
						});
								const dataToSave = data.save();

					const file = fs.createWriteStream(`${req.body.data.session_id}.mp4`);
					const request = https.get(req.body.data.recording_presigned_url, function(response) {
					   response.pipe(file);
					   // after download completed close filestream
					   file.on("finish", async() => {
						   console.log("Download Completed");
						   file.close();
					   });
					});
				}
				if (req && req.body && req.body.type && req.body.type === 'peer.leave.success') 	{
						const data = await new tbl_WebinarJoined({
							room_name			: 	req.body.data.room_name,
							session_id			: 	req.body.data.session_id,
							joined_at			: 	req.body.data.joined_at,
							left_at				:	req.body.data.left_at,
							reason				: 	req.body.data.reason,
							message				: 	req.body.data.message,
							user_name			: 	req.body.data.user_name,
							duration			: 	req.body.data.duration,
							session_started_at	: 	req.body.data.session_started_at,
						});
					   const dataToSave = data.save();
					   message  =   "User Created successfully.";
					}
			res.status(200).json({status:1, message:'Detail of User'});
		}
	catch(error)
		{
			res.status(500).json({status:0, message: error.message});
		}
    })
//Get Single Method	
    


