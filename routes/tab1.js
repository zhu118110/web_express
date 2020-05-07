var express = require('express');
var router = express.Router();
var prdList =require('../public/javascripts/tab1.js');
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// 首页推荐内容
router.get("/prdList",function(req,res){
    prdList.find({},function(err,doc){
        if(err){
            res.json({
                statu:"error",
                msg:"获取数据失败"
            })
        }else if(doc.length>0){
            res.json({
                statu:"success",
                data:doc,
                msg:"获取数据成功"
            })
        }else{
            res.json({
                statu:"warning",
                data:doc,
                msg:"没有更多数据"
            })
        }
    })
})

module.exports = router;