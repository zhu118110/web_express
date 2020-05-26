
var express=require("express");
var model=require("./dataBase.js");

// 分类表数据
var schema=new model.Schema({
	"title":String,
   
});
var classify=model.model("product",schema,"product");
module.exports=classify;