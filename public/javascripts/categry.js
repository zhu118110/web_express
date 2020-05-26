var express=require("express");
var model=require("./dataBase.js");

// 分类表数据
var schema=new model.Schema({
	"title":String,
    "imgSrc":String,
    "productId":String
});
var categry=model.model("categry",schema,"categry");
module.exports=categry;