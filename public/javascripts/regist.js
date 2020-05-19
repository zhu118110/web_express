var express=require("express");
var model=require("./dataBase.js");
var schema=new model.Schema({
	"account":String,
    "passWorld":String,
    "phone":String,
    "userName":String,
    "headImg":{
        type:String,
        default:"http://192.168.88.69:3200/headImg/head_default_img.jpg"
    }
});
var regist=model.model("regist",schema,"regist");
module.exports=regist;