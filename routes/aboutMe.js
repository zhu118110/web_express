const express=require("express");
const router = express.Router(); 
const formidable = require('formidable');//此模块可解析客户端上传的文件
const fs=require("fs");
const tb_regist =require('../public/javascripts/regist');
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
    try{
        tb_regist.findOne({"_id":userId},function(err,doc){
            if(err){
               throw err;
            }else{
                res.json({
                    statu:"success",
                    data:doc
                })
            }
        })
    }catch(err){
        res.json({
            statu:"error",
            
        })
    }
    
})



// 我的资料 页面，修改头像时接收客户端提交的头像并改变数据库的头像
router.post("/uploadHeadImg",function(req,res){
    let userId ="";
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.maxFilesSize = 2*1024* 1024;
    form.keepExtensions=true; //保留后缀
    form.uploadDir="public/uploadHeadImages";   //设置临时目录
    try{

   
        form.parse(req,function(err,fields,files){
            if(err){
                console.log("没有接收到图片"+err);
                res.json({
                    code:"0"
                })
            }
            userId=fields._id;  //获取用户id
            // files 包括接受的文件的信息
            Object.keys(files).forEach(function(name) {  
                // console.log(name);   //name是客户端上传的文件路径
                // console.log(files[name].path); // 服务端保存的路径
                // 将上传的图像保存到数据
                let filePath="http://192.168.88.69:3200";
                filePath+=files[name].path.substring(6);  //将返回的临时地址中的 public\ 字段删掉改为服务端地址
                filePath=filePath.replace(/\\/img,"/");    //将路径中的\变为/
                console.log("图片地址是"+filePath)
                // 更新头像字段
                tb_regist.findByIdAndUpdate({"_id":userId},{"$set":{
                    "headImg":filePath
                }},function(err,doc){
                
                    if(err&&!doc){
                        res.json({
                            code:"0"
                        })
                    }else{
                        res.json({
                            code:"1",
                        })
                    }

                })


            
            });
        }) 
    }catch(err){
        res.json({
            code:"0"
        })
    }
}),


// 编辑个人资料
router.post("/editUserName",function(req,res){
    let [_id,userName,headImg]=[req.body._id,req.body.userName,req.body.headImg];
    try{
        tb_regist.findByIdAndUpdate({_id},{"$set":{
            userName,
            headImg
        }},function(err,doc){
            if(err){
                throw err;
            }else{
                if(doc){
                    res.json({
                        code:"1"
                    })
                }
            }
        })
    }catch(err){
        res.json({
            code:"0"
        })
    }

})

module.exports=router;