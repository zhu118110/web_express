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
// -------------------等待发货的订单------------------------------------------

// 点个商品购买后生产等待发货的信息
router.post("/buySingle",function(req,res){
    let user_id=req.body.user_id;
    let prdInfor=JSON.parse(req.body.prdInfor);  //数据格式为：[ [{商品1}],[{商品2}],[{商品3}],.... ]
    prdInfor.forEach((val,i)=>{
        val.forEach((r,n)=>{
            let enity=new tb_waitSend();
            enity.user_id=user_id;   //用户id
            enity.prd_id=r._id;   //商品id
            enity.buy_date=r.dateStr;     //购买日期
            enity.singlePrice=r.price;     //商品单价
            enity.buy_number=r.buyNumber;   //购买的数量
            enity.totle=r.totle;     //购买的总价
            enity.status=0;     //商品状态 ---0:未发货
            enity.orderNumber=r.orderNumber;    //订单号码
            // 遍历收货地址
            r.address.forEach(a=>{
                enity.recipients=a.recipients;    //  收件人
                enity.phone=a.phone;   //手机号
                enity.province=a.province;    //省
                enity.city=a.city   //市
                enity.district=a.district;   //县、区
                enity.detailAddress=a.detailAddress;  //详细地址
            });
            // 遍历商品属性
            r.attr.forEach(attr=>{
                enity.attr+=attr;
            });
            try{
                // 保存到数据库
                enity.save(function(err){
                    if(err){
                        throw err;
                    }else{
                        if(n==val.length-1){
                           res.json({
                               code:"1"
                           })
                        }
                    }
                })
            }catch(err){
                res.json({
                    code:"0",
                });
                return;
            };
        })
    });
       
});


// 根据用户id查找订单表字段status为0的商品，渲染在未发货页面上
router.post("/waitSendData",function(req,res){
    let user_id=req.body.userId;
    let target=req.body.target;   //waitSend | alreadySend   根据不同的值请求不同的订单状态

    switch(target){
        case "waitSend":    //查找等待发货的数据
            findOrder(0)
        break;
         
        case "alreadySend": //查找已经发货的数据，statu是1
            findOrder(1)
        break;
    }
    
    function findOrder(statuNumber){
        tb_waitSend.find({user_id},function(err,doc){
            if(err){
                res.json({
                    code:"0",
                })
            }else if(doc.length>0){
                let arr=[];
                doc.forEach(val=>{
                    if(val.status==statuNumber){
                        arr.push(val);
                    }
                })
                res.json({
                    code:"1",
                    num:arr.length,
                })
            }else{
                res.json({
                    code:"-1",
                    
                })
            }
        })
    }
})




module.exports = router;