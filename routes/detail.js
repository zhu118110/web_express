let express = require('express');
let router = express.Router();
let tb_prdList =require('../public/javascripts/tab1.js');   //首页推荐数据表
let tb_collect =require('../public/javascripts/collect.js');   //收藏表
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// ---------------------------------------------------------------商品详情页的后台接口----------------------------------------------------------------------------


// 刚进入详情页时根据商品id给前端返回这个商品的信息
router.post("/detail",function(req,res){
    let prd_id=req.body.prd_id;
    tb_prdList.findOne({"_id":prd_id},function(err,doc){
        try{
            err
        }catch{
            res.json({
                code:"0",
                statu:"error"
            })
        }
        
        res.json({
            code:"1",
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
  
    tb_collect.find({"user_id":user_id,"prd_id":prd_id},function(err,doc){
        try {
            err
        }
        catch{
            res.json({
                statu:"error"
            })
        }
        // 代表已经收藏
        if(doc.length>0){
            res.json({
                code:"1"
            })
        }else{
            // 代表没有收藏
            res.json({
                code:"0"
            })
        }
        
    })
})

// 商品详情页点击添加收藏功能
router.post("/addCollect",function(req,res){
    let user_id=req.body.user_id;
    let collect_date=req.body.collect_date;
    // let prd_id=req.body.prd_id;
    // let prd_img=req.body.prd_img;
    // let prd_price=req.body.prd_price;
    let prdArr=JSON.parse(req.body.prd);
    let enity=new tb_collect({});
    
   
    enity.user_id=user_id;
    enity.collect_date=collect_date;

    prdArr.forEach(val=>{
        enity.prd_id=val._id,
        enity.prd_price=val.price,
        enity.prd_img=val.img,
        enity.title=val.title,
        enity.buy=val.buy
    });
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
    tb_collect.find({"user_id":user_id,"prd_id":prd_id},function(err,doc){
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