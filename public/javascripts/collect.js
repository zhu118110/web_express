var express=require("express");
var model=require("./dataBase.js");
// 收藏表的字段
var schema=new model.Schema({
    "prd_id":String,   //收藏的商品的id,
    'user_id':String,   //用户id
	// "productId":String,    //所属商品id,如女装,男装
    // "categaryId":String,   //所属分类id，如女士t恤,男士T恤
    "prd_price":String,    //价格
    // "number":Number,   //库存
    "prd_img":String,    //商品主图
    "collect_date":String,   //收藏时间
    "title":String,
    "buy":String
});
var collect=model.model("collect",schema,"collect");
module.exports=collect;