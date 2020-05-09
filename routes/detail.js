let express = require('express');
let router = express.Router();
let prdList =require('../public/javascripts/tab1.js');   //首页推荐数据表
let collect =require('../public/javascripts/collect.js');   //收藏表
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 详情页api
router.post("/detail",function(req,res){
    let prd_id=req.body.prd_id;
    prdList.findOne({"_id":prd_id},function(err,doc){
        try{
            err
        }catch{
            res.json({
                statu:"error"
            })
        }
        
        res.json({
            statu:"success",
            data:doc
        })
    })
})

// 前端进入详情页先查看此商品是否被收藏
// 1代表已被收藏，0代表没有收藏
router.post("/findCollect",function(req,res){
    let prd_id=req.body.prd_id;
    let user_id=req.body.user_id;
    console.log("商品id"+prd_id);
    console.log("用户id"+user_id);
    collect.find({"user_id":user_id,"prd_id":prd_id},function(err,doc){
        try {
            err
        }
        catch{
            res.json({
                statu:"error"
            })
        }
        if(doc.length>0){
            res.json({
                code:"1"
            })
        }else{
            res.json({
                code:"0"
            })
        }
        
    })
})

// 商品详情页点击添加收藏功能
router.post("/addCollect",function(req,res){
    let prd_id=req.body.prd_id;
    let user_id=req.body.user_id;
    let enity=new collect({
        prd_id:prd_id,
        user_id:user_id
    })
    
    enity.save(err=>{
        try {
            err
        }
        catch{
            res.json({
                statu:"error"
            })
        }
        res.json({
            statu:"success"
        })
    })
})

// 商品详情页取消收藏功能
router.post("/cancelCollect",function(req,res){
    let prd_id=req.body.prd_id;
    let user_id=req.body.user_id;
    collect.find({"user_id":user_id,"prd_id":prd_id},function(err,doc){
        try {
            err
        }
        catch{
            res.json({
                statu:"error"
            })
        }
        doc.forEach((val,i)=>{
            val.remove(function(err){
                try {
                    err
                }
                catch{
                    res.json({
                        statu:"error"
                    })
                }
                res.json({
                    statu:"success"
                })
            })
        })
    })
})

module.exports=router;