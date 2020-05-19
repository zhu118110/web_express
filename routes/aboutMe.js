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

let imgName=""

// 我的资料 页面，修改头像时接收客户端提交的头像并改变数据库的头像
router.post("/uploadHeadImg",function(req,res){
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.maxFilesSize = 2 * 1024 * 1024;
    form.keepExtensions=true; //保留后缀
    form.uploadDir="public/temp";   //设置临时目录
    form.parse(req,function(err,fields,files){
        if(err){
            console.log("没有接收到图片"+err);
            res.json({
                code:"0"
            })
        }
        // files 包括接受的文件的信息
        Object.keys(files).forEach(function(name) {  
            // console.log(name);   //name是客户端上传的文件路径
           
            // console.log(files[name].path); // 服务端保存的路径
            imgName=files[name].path.slice(12);
           
            res.json({
                code:"1",
                path:files[name].path,
            })
        });
    }) 
}),


router.post("/editUserName",function(req,res){
    let temp="E:/muiApp/mui_express/public/temp/";   //本地临时文件夹
	let imgArr=[];
    fs.readdir(temp,function(err,files){
        if(err){
            res.json({
                code:"0"
            });
            return false;
        }else{
            // files:[]
            for(let i in files){
                imgArr.push(files[i])
                console.log(files[i])
                    var read=fs.createReadStream(temp+files[i]);  //读取默认目录下的图片
                    var newPath='/uploadHeadImages/'+files[i];   //创建保存图片的新的文件路径
                    var write=fs.createWriteStream("public/"+newPath);   //设置新的路径
                    read.pipe(write); 
                    // 写入完成后执行
                    write.on('close',function (err) { 
                        if(err){
                            throw err;
                        }else{
                            // 清空临时文件夹
                            fs.unlink(temp+files[i],function(err){
                                if(err) throw err;
                                console.log("删除成功")
                            })
                        }
                    })
                
                
            }
        }
    })




    let [_id,userName,headImg]=[req.body._id,req.body.userName,req.body.headImg];
    tb_regist.findByIdAndUpdate({_id},{"$set":{
        userName,
        headImg
    }},function(err,doc){
        if(err){
            res.json({
                code:"0"
            })
        }else{
           if(doc){
            res.json({
                code:"1"
            })
           }
        }
    })

})

module.exports=router;