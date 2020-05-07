// 首页推荐数据
var express=require("express");
var model=require("./dataBase.js");
var schema=new model.Schema({
	"title":String,
    "img":String,
    "price":String,
    "originalPrice":String,
    "number":Number,
    "productId":String,
    "categaryId":String,
});
var prdList=model.model("prdList",schema,"prdList");
module.exports=prdList;