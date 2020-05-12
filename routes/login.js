var express = require('express');
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


//  注册账号
//  先在数据库查找账号是否被注册过，没有注册过再往数据库存入数据
//  接收前端注册的账号、密码、手机号存入数据库
router.post("/regist",function(req,res){
    let account=req.body.account;
    let passWorld=req.body.passWorld;
    let phone=req.body.phone;
    function find(){
        // 查找注册的账号或者手机号是否已经被注册过
        tb_regist.find({$or:[{"account":account},{"phone":phone}]},function(err,doc){
            if(err) throw err;
            if(doc.length>0){
                doc.forEach(val=>{
                    // 判断账号是否被注册过
                    if(val.account==account){
                        res.json({
                            statu:"accountIsHave"
                        });
                    }else if(val.phone==phone){
                        // 判断手机号是否被注册过
                        res.json({
                            statu:"phoneIsHave"
                        });
                    }
                })
            }else{
                // 没有注册过则向数据库插入数据
               
               insert()
           }
           
        })
    }
    find();  // 先在数据库查找账号或者手机号是否被注册过，

    // 插入数据，没有注册过时调用
    function insert(){
        let userNum=Math.floor(Math.random()*100*9999999999);
        let entity=new tb_regist({
            account:account,
            passWorld:passWorld,
            phone:phone,
            userName:`客官${userNum}`
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
    tb_regist.find({"account":account},function(err,doc){
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
                console.log("帐号"+newArr[0]._id)
                res.json({
                    statu:"success",
                    data:newArr[0]._id,
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
                statu:"nothing",
                msg:"账号不存在"
            })
        }
    })
   
});

//   手机号码登陆
router.post('/phoneLogin', function(req, res) {
    let phone=req.body.phone;
    tb_regist.find({"phone":phone},function(err,doc){
        if(err){
            // 数据库发生错误时 触发
            res.json({
                statu:"error",
                msg:"数据库发生错误"
            })
        }else if(doc.length>0){
             // 根据手机号查找到数据时返回成功状态
            console.log("手机号"+doc[0]._id)
            res.json({
                statu:"success",
                data:doc[0]._id,
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