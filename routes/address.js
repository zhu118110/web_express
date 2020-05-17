var express = require('express');
var router = express.Router();
var tb_address=require('../public/javascripts/address');
router.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Credentials', true);
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers","Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,SOAPAction");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// -----------------------------地址页面的数据接口--------------------------------------------------

// 增: 添加地址
router.post('/addAddress', function(req, res) {
    let obj={};
    obj.userId=req.body.userId;
    obj.recipients=req.body.recipients;
    obj.phone=req.body.phone;
    obj.province=req.body.province;
    obj.city=req.body.city;
    obj.district=req.body.district;
    obj.detailAddress=req.body.detailAddress;
    obj.isDefault=req.body.isDefault;

    // 如果上传的地址中设置了默认地址，则将其他默认地址设置为false然后保存
    if(obj.isDefault=="true"){
     
      tb_address.updateMany({"userId":obj.userId},{"$set":{
        "isDefault":false
      }},function(err,doc){
        if(err) throw err;
        save()
      })
    }else{
        save()
    }
  
    function save(){
      const enity=new tb_address(obj);
      enity.save(function (err) { 
        if(err){
          res.json({
            code:"0"
          })
        }else{
          res.json({
            code:"1"
          })
        }
      })
    }
    
});

//查: 地址页面刚加载时查找地址
router.post('/selectAddress',function(req,res){
    let userId=req.body.userId;
   
    tb_address.find({userId},function(err,doc){
      if(err){
        res.json({
          code:"0"
        })
      }else{
      
        res.json({
          code:"1",
          data:doc
        })
      }
    })
})



//改: 改变默认地址
router.post('/setDefault',function(req,res){
  let userId=req.body.userId;   //用户ID
  let index=req.body.index;   //  要设置的地址的下标
  // 1.先根据用户id找到所有的地址数据
  tb_address.find({userId},function(err,doc){
    // 2.遍历地址数据,如果下标与用户设置的地址的下标相等则改变数据库中的默认值为true，其他地址变为false
    doc.forEach((val,i,arr)=>{
      if(i==index){
        updata(val,true)
      }else{

        updata(val,false)
      }
    })
  })

  function updata(val,isDefault){
    tb_address.update({"_id":val._id},{"$set":{
      "isDefault":isDefault
    }},function(err,doc){
      if(err) throw err;
      
    })
  }
})

// 删:删除地址

router.post("/delAddress",function(req,res){
  let userId=req.body.userId;
  let _id=req.body._id;
  tb_address.findOneAndRemove({userId,_id},function(err,doc){
    if(err) throw err;
    res.json({
      code:"1",
     
    })
  })
})
module.exports = router;
