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
`` npm install -g @angular/cli `` 

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

### Step 1 : Configuring MongoDB
You can configure and use online mongodb instance from [mLab](https:\\mlab.com)  

Install mongoose client in node module.  
`` npm install mongoose``
