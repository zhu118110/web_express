var express=require("express");
var model=require("./dataBase.js");
var schema=new model.Schema({
	"account":String,
    "passWorld":String,
    "phone":String
});
var regist=model.model("regist",schema,"regist");
module.exports=regist;