const express=require("express");
const router = express.Router(); 
const formidable = require('formidable');//此模块可解析客户端上传的文件
const fs=require("fs");
const tb_shopCar =require('../public/javascripts/shopCar');
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


// 加入购物车
router.post("/joinCar",function(req,res){
    let userId=req.body.userId;
    let prd=req.body.prd;
    // let attr=req.body.attr;
    // let prd_id=req.body.prd_id;
    // let buyNumber=req.body.buyNumber;
    // let attr_id=req.body.attr_id;
    // let val_id=req.body.val_id;
    
    let enity=new tb_shopCar({
        userId:userId,
        prd:prd
        // attr:attr,
        // prd_id:prd_id,
        // buyNumber:buyNumber
    })
    enity.save(function(err){
        if(err){
            res.json({
                code:"0"
            });
        }else{
            res.json({
                code:"1"
            });
        }
    })
});


router.post("/findshopCar",function(req,res){
    let userId=req.body.userId;
   
    tb_shopCar.find({"userId":userId},function(err,doc){
        if(err){
            res.json({
                code:"-1"
            })
            return;
        }
        if(doc.length>0){
            res.json({
                code:"1",
                data:doc
            })
        }else{
            res.json({
                code:"0",
                data:doc
            })
        }
       

    })
})

module.exports=router;