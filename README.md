# starter-mean-app #
node angular application using MEAN stack.

## MEAN stack mean ##  
**MongoDb** - NoSQL database.  
**Express** - web framework that runs on node.  
**Angular** - Client side development platform.    
**Node** - Execution environment.  

## Setup MEAN project  ##

### Step 1 : Install/upgrade angular cli ### 
 angular cli is a commnd line interface to build angular application.  
``npm install -g @angular/cli`` 

### Step 2 : Create new Angular project
Below command creates new angular project with routing module.  
`` ng new project1 --routing ``  

### Step 3 : Run application in browser  
Execute below command inside project folder  
`` ng serve -o ``  

### Step 4 : Build project 
`` ng build ``  
It creates the distributable folder "dist" of entire angular application,  
which is further feed into the express server.  

### Step 5 : Install node module dependencies
* express 
* body-parser  
`` ng install --save express body-parser``  

### Step 6 : Create ``server.js`` in project root path.
```javascript
const express = require('express');
const bodyParser = require('body-parser');

// used for joining path
const path = require('path');

// points to api.js inside server/routes folder. 
const api = require('./server/routes/api');

const port = 3000;
const app = express();

// It points to folder where all the angular code are placed.
// here we are joining the path of the current directory with the dist folder.
// this gives the express the access to dist folder.
app.use(express.static(path.join(__dirname,'dist')));

app.use(bodyParser.urlencoded({extended:true}));

// specify when to use api route.
app.use('/api', api);


// any request other than /api will point to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// start server listening on port
app.listen(port, function(){
   console.log("server running on localhost : " + port);
});
```

### Step 7 : Create ``api.js`` under folder path ``server\routes`` 
```javascript
const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
	res.send('api works');
});

module.exports = router;
```
### Step 8 : Execute and verify application is working.  
``node server``  

### Step 9 : Configuring MongoDB
You can configure and use online mongodb instance from [mLab](https:\\mlab.com)  
1. signup for new account  
2. create new MongoDB deployment.  
3. select single node and sandbox.
4. provide database name and click on mongodb deployment.
5. click on the instance created and then click on add collections.
6. provide the name to the collection.
7. then click on users nect to collections tab and click on add database user.
8. provide database username & password and click on create.
9. go back and in collection tab click on created collection then click on documents tab.  
10. click on add document and save your document.  

### Step 10 : Install mongoose package.  
`` npm install --save mongoose``

### Step 11 : Create model inside server/models folder.
create model eg. video.js inside models folder.
```javascript
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// below schema is the blueprint of the object in the database.
const videoSchema = new Schema({
    title: String,
    url: String,
    description: String
});

// create model from schema
// video - name of the model
// mongodata - collection name in mongodb
module.exports = mongoose.model('video', videoSchema, 'mongodata');
```
### Step 12  : configure mongoDB connectivity
add below scripts into the api.js file present in server/routes folder.  
```javascript
const mongoose = require('mongoose');

// string you can copy from http://mlab user tab.
const db = "mongodb://user:pass123@dsxxxxxx.mlab.com:55260/mongodata";
mongoose.Promise = global.Promise;
mongoose.connect(db, function(err){
	if(err){
		console.error("Error!" + err);
	}
});
```
### Step 13 : verify that configuration is sucessfull.
``node server`` and hit the url ``http://localhost:3000/api`` in browser.  
No error in console will confirm that connection to mongoDB stablished successfully.  

### Step 14 : fetch json from the mongoDB.
add below code in ``api.js`` file inside ``server/routes`` folder.  
```javascript
// this points to model created inside model folder ie. video.js
const Video = require('../models/video');

// fetch all the videos from mongoDB
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
```
### Step 15 : get model by id
add below code in ``api.js`` file.  
```javascript
// getting single video json by Id
router.get('/videos/:id', function(req, res){
	console.log('get request for single video');
	
	// find is the method provided by mongoDB
	Video.findById(req.params.id).exec(function(err,data){
		if(err){
			console.log("Error retrieving videos");
		} else {
			res.json(data);
		}
	});
});
```
### Step 16 : insert data into mongoDB.
add the below code in ``api.js`` and test via postman POST method.  
```javascript
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
```
