const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

// this points to model created inside model folder ie. video.js
const Video = require('../models/video');

// string you can copy from http://mlab user tab.
const db = "mongodb://user:pass123@ds255260.mlab.com:55260/mongodata";
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
	if(err){
		console.error("Error!" + err);
	}
});

router.get('/', function(req, res){
	res.send('api works');
});

// getting all videos json
router.get('/videos', function(req, res){
	console.log('get request for all videos');
	
	// find is the method provided by mongoDB
	// {} dont have search criteria
	Video.find({}).exec(function(err,data){
		if(err){
			console.log("Error retrieving videos");
		} else {
			res.json(data);
		}
	});
});

// getting single video json by Id
router.get('/videos/:id', function(req, res){
	console.log('get request for single video');
	
	// find is the method provided by mongoDB
	Video.findById(req.params.id).exec(function(err,data){
		if(err){
			console.log("Error retrieving video");
		} else {
			res.json(data);
		}
	});
});

// save video json into mongoDB
router.post('/video', function(req,res){
	console.log("post a video");
	var newVideo = new Video();
	newVideo.title = req.body.title;
	newVideo.url = req.body.url;
	newVideo.description = req.body.description;

	newVideo.save(function(err, insertedVideo){
		if(err){
			console.log("Error saving video");
		} else {
			res.json(insertedVideo);
		}
	});
});

// update video json into mongoDB
router.put('/video/:id', function(req,res){
	console.log("update a video");
	
	Video.findByIdAndUpdate(
		// id for which data will be updated
		req.params.id,
		{
			// data which to be updated
			$set:{
				title:req.body.title,
				url : req.body.url,
				description: req.body.description
			}
		},
		{
			// if no entry found then create
			new: true
		},	
		function(err, updatedVideo){
			if(err){
				console.log("Error updating video");
			} else {
				// return back the updated json
				res.json(updatedVideo);
			}
		}
	);
});


// deleting video json by Id
router.delete('/video/:id', function(req, res){
	console.log('deleteting a video');
	
	// find is the method provided by mongoDB
	Video.findByIdAndRemove(req.params.id, function(err,data){
		if(err){
			console.log("Error deleting video");
		} else {
			res.json(data);
		}
	});
});

module.exports = router;