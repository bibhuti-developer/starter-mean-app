# starter-mean-app
node angular application using MEAN stack.

## Steps to setup MEAN project
### Install/upgrade angular cli
### ng build to create dist folder
### Install express and body-parser

### Create server.js
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

### create server\routes\api.js
```
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

### 
