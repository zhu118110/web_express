let express=require("express");
let router=express.Router();
let tb_collect=require("../public/javascripts/collect");  //收藏表


router.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})
// ------------------------------------收藏页面的数据接口--------------------------------


// 刚进入收藏页时根据用户的id查找用户收藏的数据
router.post("/collect",function(req,res){
    let user_Id=req.body.user_Id;
    tb_collect.find({"user_id":user_Id},function(err,doc){
        try{
            err
        }catch{
            res.json({
                statu:"error",
            })
        }
        // console.log(doc);
        res.json({
            statu:"success",
            data:doc 
        })
    })
})


// 根据用户id和收藏的商品id从数据库删除商品
router.post("/delCollect",function(req,res){
    let user_id=req.body.userId;
    let prdIdArr=JSON.parse(req.body.prd_idArr);
    let length=0;
    prdIdArr.forEach((val,i)=>{
        tb_collect.findOneAndRemove({user_id,"_id":val},function(err,doc){
            if(err){
                res.json({code:"0"})
            }else{
                // doc:  删除的商品
                let delDoc=[];         
                delDoc.push(doc);
                length+=delDoc.length;
                if(length==prdIdArr.length){
                    res.json({
                        code:"1"
                    })
                }
            }
        })
    })
    
})
module.exports=router;