var express=require("express");
var model=require("./dataBase.js");

// 购买表的字段
var schema=new model.Schema({
    "prd_id":String,   //购买的商品的id,
    'user_id':String,   //用户id
	// "productId":String,    //所属商品id,如女装,男装
    // "categaryId":String,   //所属分类id，如女士t恤,男士T恤
    "singlePrice":String,    //单价
    "buy_date":String,   //购买的时间
    "buy_number":Number,   //购买的数量
    "totle":Number,   //总价
    "recipients":String,  //收件人
    "phone":String,   //手机号
    "province": String,   //省
    "city": String,  //市
    "district":String,   //县区
    "detailAddress": String,   //详细地址
    "status":{     //订单状态，默认false，表示未发货
        type:Boolean,
        default:false
    }
});
var waitSend=model.model("waitSend",schema,"waitSend");
module.exports=waitSend;