var express=require("express");
var model=require("./dataBase.js");

var schema=new model.Schema({
    'attrName':String,   //产品属性名称
    "prd_list_id":String,    //产品id
   
});
var prd_attr=model.model("prd_attr",schema,"prd_attr");
module.exports=prd_attr;