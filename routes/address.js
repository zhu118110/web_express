var express = require('express');
var router = express.Router();
var tb_address=require('../public/javascripts/address');
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


/* GET home page. */
router.post('/addAddress', function(req, res) {
    let obj={};
    obj.userId=req.body.userId;
    obj.recipients=req.body.recipients;
    obj.phone=req.body.phone;
    obj.province=req.body.province;
    obj.city=req.body.city;
    obj.district=req.body.district;
    obj.detailAddress=req.body.detailAddress;
    obj.isDefault=req.body.isDefault;
   
    const enity=new tb_address(obj);
   
    enity.save(function (err) { 
      if(err){
        res.json({
          code:"0"
        })
      }else{
        res.json({
          code:"1"
        })
      }
    })
});

module.exports = router;
