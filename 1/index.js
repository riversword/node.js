const request = require('request');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const analyze = require('./analyze');


function start() {
    request(config.url, function(err, res, body) {
        console.log('start1');
        if(!err && res) {
            console.log('start2');
            analyze.findImg(body, downLoad);
        }
    });
}

function downLoad(imgUrl, i) {
    let ext = imgUrl.split('.').pop(); //取到图片地址点号后字符串(图片文件类型)
    request(imgUrl).pipe(fs.createWriteStream( path.join(config.imgDir, i + '.' + ext), { 'encoding': 'utf-8' } ) );
    console.log(imgUrl, i);
}

start();