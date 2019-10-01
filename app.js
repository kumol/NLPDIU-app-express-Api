require('./config/config');
require('./models/db');
var express = require("express");
var app = express();
var adminRoute = require('./api/routes/admin/admin');
var indexRoute = require('./api/routes/index/index');
var bodyParser = require('body-parser');
//var morgan = require('morgan');
var path = require('path');
var cors = require("cors");
var port = process.env.PORT; 

 app.listen(port,()=>{
     console.log("server starts at port ",process.env.PORT);
 });
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//app.use(morgan());
//app.use("/public/uploads", express.static(path.join(__dirname, 'public/uploads')));
app.use("/public/uploads",express.static("public/uploads"));
app.use("/public/uploads/car",express.static("public/uploads/car"));
app.use('/admin',cors(),adminRoute);
app.use('/user',cors(),indexRoute);
app.get('/', (req, res)=>{
    res.send("<h1>NLP LAB DIU</h1>")
})
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','POST,PUT,DELETE,GET');
        return res.status(200).json({});
    }
    next();
  })
//app.use(cors());
app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});
app.use((error, req,res,next)=>{
    res.status(error.status||500);
    res.json({
        error:error.message
    });
});

