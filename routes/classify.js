var express = require('express');
var router = express.Router();
var tb_product=require('../public/javascripts/product');
var tb_categry=require('../public/javascripts/categry');
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// -----------------------------分类页面的数据接口--------------------------------------------------

// 分类页面刚加载时查找商品表,将所有商品返回给前端
router.get("/showProduct",function(req,res){
    tb_product.find({},function(err,doc){
        if(err || doc.length<=0){
            res.json({
                code:"0"
            });
            return;
        }else{
            res.json({
                code:"1",
                data:doc
            })
        }
       
    })
})


// 根据前端提供的商品的id去分类表中查找每个商品对应的分类
router.post("/categry",function(req,res){
    let productId=req.body.titleId;
    tb_categry.find({},function(err,doc){
        if(err || doc.length<=0){
            res.json({
                code:"0"
            });
            return;
        }else{
            res.json({
                code:"1",
                data:doc
            })
        }
    })
})





// 测试,查找每个商品对应的分类
router.post("/test",function(req,res){
    tb_categry.find({},function(err,doc){
        if(err || doc.length<=0){
            res.json({
                code:"0"
            });
            return;
        }else{
            res.json({
                code:"1",
                data:doc
            })
        }
    })
})
module.exports=router;