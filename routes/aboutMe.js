let express=require("express");
var router = express.Router();
var tb_regist =require('../public/javascripts/regist');
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// ---------------------------------------------------------------关于我的页面的后台接口----------------------------------------------------------------------------

// 关于我 页面刚加载时根据用户id获取用户信息返回给前端
router.post("/aboutMe",function(req,res){
    let [userId=""]=[req.body.userId];
   
    tb_regist.findOne({"_id":userId},function(err,doc){
        if(err){
            res.json({
                statu:"error",
                
            })
        }else{
            res.json({
                statu:"success",
                data:doc
            })
        }
    })
})

module.exports=router;