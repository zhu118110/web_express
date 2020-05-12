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
router.post("/collect",function(req,res){
    let user_Id=req.body.user_Id;
    console.log(user_Id)
    tb_collect.find({"user_id":user_Id},function(err,doc){
        try{
            err
        }catch{
            res.json({
                statu:"error",

            })
        }
        console.log(doc);
        res.json({
            statu:"success",
            data:doc 
        })
    })
})
module.exports=router;