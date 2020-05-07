var express = require('express');
var router = express.Router();
var regist =require('../public/javascripts/regist');
router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.post('/add', function(req, res) {
    var data={
      name:"小明"
    }
    res.json(data);
  });


//  注册账号
//  先在数据库查找账号是否被注册过，没有注册过再往数据库存入数据
//  接收前端注册的账号、密码、手机号存入数据库
router.post("/regist",function(req,res){
    let account=req.body.account;
    let passWorld=req.body.passWorld;
    let phone=req.body.phone;
    find();
    function find(){
        regist.find({"account":account},function(err,doc){
                if(err){
                    throw err;

                }else if(doc.length>0){   //判断是否被注册过
                   res.json({
                       statu:"isHave"
                   });
                }else{ 
                    // 没有注册个插入数据
                    insert()
                }
            })
    }
   

    // 插入数据，没有注册过时调用
    function insert(){
        let entity=new regist({
            account:account,
            passWorld:passWorld,
            phone:phone
        })
        entity.save(function(err){
            if(err){
                res.json({
                    statu:"error",
                })
            }else{
                res.json({
                    statu:"success",
                })
            }
        })
    }
    
    
})

//   账号密码登陆
//   
router.post('/accountLogin', function(req, res) {
    let account=req.body.account;
    let passWord=req.body.passWord;
    regist.find({"account":account},function(err,doc){
        if(err){
            // 数据库发生错误时 触发
            res.json({
                statu:"error",
                msg:"数据库发生错误"
            })
        }else if(doc.length>0){
            // 根据账号查找到数据时触发
            let newArr;
            // 根据账号查找到的数据来判断输入密码与注册密码是否一致
            newArr=doc.filter((val,i,arr)=>{
               return val.passWorld==passWord;
               
            })
            // 一致
            if(newArr.length>0){
                res.json({
                    statu:"success",
                    data:newArr,
                    msg:"欢迎登陆"
                });
            }else{
            // 不一致
                res.json({
                    statu:"faild",
                    msg:"账号或密码错误"
                })
            }
           
        }else{
            // 根据账号没有查找到数据时触发
            res.json({
                statu:"faild",
                msg:"账号或密码错误"
            })
        }
    })
   
});
//   手机号码登陆
router.post('/phoneLogin', function(req, res) {
    let phone=req.body.phone;
    regist.find({"phone":phone},function(err,doc){
        if(err){
            // 数据库发生错误时 触发
            res.json({
                statu:"error",
                msg:"数据库发生错误"
            })
        }else if(doc.length>0){
             // 根据手机号查找到数据时触发
            res.json({
                statu:"success",
                data:doc,
                msg:"欢迎登陆"
            });
        }else{
            res.json({
                statu:"faild",
                msg:"手机号不存在"
            })
        }
    })
    
   
});
module.exports = router;