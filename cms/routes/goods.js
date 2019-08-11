var express = require("express");
var router = express.Router();

router.use((req, res, next) => {
  // 全局添加
  res.append("Access-Control-Allow-Origin", "*");
  next();
});

const {
  ObjectId,
  find,
  updateOne,
  deleteOne,
  insertMany
} = require("../libs/db");

router.get("/all", async function(req, res, next) {
  //查询所有数据
  console.log("123");
  find("goods").then(function(data) {
    console.log(data);
    res.send(data);
  });
});

// //更改商品信息
router.get("/update", async function(req, res, next) {
  var data = req.query;
  var query = {
    _id: ObjectId(data._id)
  };
  delete data._id;
  //{$set: { b : 1 } }
  updateOne("goods", query, {
    $set: data
  }).then(function(data) {
    console.log(data);
    res.send(data);
  });
});

//删除
router.get("/delete", async function(req, res, next) {
  var data = req.query;
  var query = {
    _id: ObjectId(data._id)
  };
  deleteOne("goods", query).then(function(data) {
    console.log(data);
    res.send("1");
  });
});

router.get("/find", async function(req, res, next) {
  var data = req.query;
  var query = {
    _id: ObjectId(data._id)
  };
  find("goods", query).then(function(data) {
    res.send(data);
  });
});

router.get("/add", async function(req, res, next) {
  var data = req.query;
  data.sales = 0;
  console.log(data);
  insertMany("goods", [data]).then(function(data) {
    console.log(data);
    res.send(data);
  });
});

module.exports = router;
