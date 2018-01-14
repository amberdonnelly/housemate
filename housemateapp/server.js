var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';
//database stuff
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/housemateapp');


router.use(function (req,res,next) {
//   console.log("/" + req.method);
  //lets router access db
  req.db = db;
  next();
});

router.get("/",function(req,res){
  res.sendFile(path + "index.html");
});

router.get("/create",function(req,res){
  res.sendFile(path + "create.html");
});

router.get("/login",function(req,res){
    res.sendFile(path + "login.html");
});

router.get("/dash",function(req,res){
    res.sendFile(path + "dashboard.html");
});

app.use("/",router);

// app.use("*",function(req,res){
//   res.sendFile(path + "404.html");
// });
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000,function(){
  console.log("Live at Port 3000");
});
