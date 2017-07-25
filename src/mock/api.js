//API
var express = require('express')

var app = express();
var appData=require("../data.json");
var seller=appData.seller,
    goods=appData.goods,
    ratings=appData.ratings;

var apiRouter=express.Router();
apiRouter.get("/seller",function(req,res){
  res.json({
    errNo:0,
    data:seller
  })
});
apiRouter.get("/goods",function(req,res){
  res.json({
    errNo:0,
    data:goods
  })
});
apiRouter.get("/ratings",function(req,res){
  res.json({
    errNo:0,
    data:ratings
  })
});

app.use('/api',apiRouter);

module.exports=app