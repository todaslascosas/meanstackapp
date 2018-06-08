//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var passport = require('passport');
var config = require('./config/database');
var app = express();

const route = require('./routes/routes');

//connect to mongodb
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected',()=>{
	console.log('connected to database ' +config.database);
});

mongoose.connection.on('error',(err)=>{
    if(err){
    	console.log('Error in database connection:'+err);
    }
});

//port no
const port = process.env.PORT || 8080;
//const port = 3000;


//adding middleware - cors
app.use(cors());
app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//static file
app.use(express.static(path.join(__dirname,'public')));
 
//routes 
app.use('/api',route);

app.get('/',(req,res)=>{
res.send('foobar');
});


app.listen(port,()=>{
	console.log('server started at port:'+port);
});