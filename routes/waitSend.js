let express = require('express');
let router = express.Router();
let tb_waitSend =require('../public/javascripts/waitSend.js');   //等待发货数据表
var tb_prdList =require('../public/javascripts/tab1.js');  //商品表
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



// 根据用户id查找订单表字段status为0的商品的数量，渲染在‘我的’页面上
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
        try{
            tb_waitSend.find({user_id},function(err,doc){
                if(err){
                   throw err;
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
        }catch(error){
            res.json({
                code:"0",
            })
        }
       
    }
});



//进入等待发货页面显示等待发货的产品的图片标题等信息
router.post("/waitSendInfor",function(req,res){
    let user_id=req.body.userId;
    
        try{
            // 根据用户的id查找未发货的数据
            tb_waitSend.find({"user_id":user_id},function(err,doc){
                if(err) throw err;
                let arr=[];
               
                if(doc.length>0){
                    let newDoc= JSON.parse(JSON.stringify(doc));
                    newDoc.forEach((val,i,array)=>{
                       if(val.status=="0"){   //status=0表示未发货
                            // 查找到未发货的商品的图片标题
                            tb_prdList.find({"_id":val.prd_id},function(err,result){
                               
                                if(err) throw err;
                                result.forEach(value=>{
                                    val.img=value.img;
                                    val.title=value.title;
                                    arr.push(val)
                                })
                                if(i==array.length-1){
                                    res.json({
                                        code:"1",
                                        data:arr
                                    })
                                }
                            })
                            
                       }
                   })
                }else{
                    res.json({
                        code:"0"
                    })
                }
            })
        }catch(err){
            res.json({
                code:"0"
            })
        }  

})




// 进入订单详情页根据订单的id获取数据
router.post("/orderDetail",function(req,res){
    let orderId=req.body.orderId;
    let arr=[]
    try{
        tb_waitSend.findById({"_id":orderId},function(err,doc){
            if(err) throw err;
            if(doc){
                let newArr=JSON.parse(JSON.stringify(doc));
                // 查找到未发货的商品的图片标题
                tb_prdList.find({"_id":newArr.prd_id},function(err,result){
                               
                    if(err) throw err;
                    result.forEach(value=>{
                        newArr.img=value.img;
                        newArr.title=value.title;
                        arr.push(newArr)
                    })
                    res.json({
                        code:"1",
                        data:arr
                    })
                })
            }
        })
    }catch(error){
        res.json({
            code:"0",
        })
    }
    
})  


module.exports = router;