var express=require("express");
var model=require("./dataBase.js");
// 地址表的字段
var schema=new model.Schema({
    'userId':String,   //用户id
    "recipients":String,    //收件人
    "phone":String,    //手机号
    "province":String,  //省
    "city":String,   //市
    "district":String,  //县区
    "detailAddress":String,   //详细信息
    "isDefault":Boolean    //是否是默认地址   
});
var address=model.model("address",schema,"address");
module.exports=address;