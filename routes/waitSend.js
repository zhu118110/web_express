let express = require('express');
let router = express.Router();
let tb_waitSend =require('../public/javascripts/waitSend.js');   //购买的物品数据表

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// -------------------点击立即购买后生成等待发货的订单------------------------------------------
router.post("/buySingle",function(req,res){
    let user_id=req.body.user_id;
    let prd_id=req.body.prd_id;
    let singlePrice =req.body.singlePrice;   //商品单价
    let buy_date=req.body.buy_date;  //购买的时间
    let buy_number=req.body.buy_number;  //购买的数量
    let totle=req.body.totle;   //商品总价
    let address=JSON.parse(req.body.address)   //收货地址
    
    let enite =new tb_waitSend({
        user_id,
        prd_id,
        singlePrice,
        buy_date,
        buy_number,
        totle,
        recipients:address[0].recipients,
        phone:address[0].phone,
        province:address[0].province,
        city:address[0].city,
        district:address[0].district,
        detailAddress:address[0].detailAddress,
    });
    enite.save(function(err){
        if(err){
            throw err
        }else{
            res.json({
                code:"1"
            })
         
        }
    })
})
module.exports = router;