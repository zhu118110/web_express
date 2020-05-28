var express=require("express");
var model=require("./dataBase.js");

var schema=new model.Schema({
    'attr_id':String,   //产品属性id
    'attr_val':String,   //产品属性值
    "prd_list_id":String,    //产品id
   
});
var prd_attr_val=model.model("prd_attr_val",schema,"prd_attr_val");
module.exports=prd_attr_val;