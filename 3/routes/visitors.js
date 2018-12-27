var express = require('express');
var router = express.Router();
const fs = require('fs');


// 访问visitors/时
router.get('/', function(req, res, next) {
  let visitorInfo = req; // 读取传来的参数

  readData('../data/visitorsData.json', (obj) => {
    res.json({
      status: '1',
      msg: 'succeed',
      result: obj
    });
  });

  writeData('../data/visitorsData.json', visitorInfo);
});


// 先读再写
function readData (path, callback) {
  fs.readFile(path, function(err, data) {
    let result
    if (err) {
      console.log('没有该目录')
      console.log(err);

      // 返回信息，你是第一个访问者
      callback({
        data: ['你是第一个访问者']
      });
    } else {
      try {
        console.log('读取到文件的数据为data=', data);
        var result = JSON.parse(data);
        console.log('读取到文件的数据为result=', result);

        // 返回数据
        callback({
          data: result
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
}

function writeData(path, obj) {
  console.log("写入数据obj=", obj);
  //将结果写入
  fs.writeFile(path, JSON.stringify(obj, null, ' '), (err) => {
      if (err) throw err;
      console.log("写入完成");
  });
}


module.exports = router;