const url = 'https://www.imooc.com'; // 待爬取的网址
const path = require('path'); // path模块处理路径
const imgDir = path.join(__dirname, 'img'); // 图片存放路径。（__dirname是当前文件所在的路径）

module.exports.url = url;
module.exports.imgDir = imgDir;