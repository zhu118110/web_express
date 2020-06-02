var express=require("express");
var model=require("./dataBase.js");

// 购物车表
var schema=new model.Schema({
    "userId":String,   //用户名
    "buyNumber":Number,   //数量
    "attr":String,     //属性
    "prd_id":String,   //产品iD
    "attr_id":String,   //属性id
    "val_id":String,   //属性值id
})

var shopCar=model.model("shopCar",schema,"shopCar");
module.exports=shopCar;
