//analyze.js 解析DOM得到图片地址
const config = require('./config');
const cheerio = require('cheerio');

function findImg(dom, callback) {
    let $ = cheerio.load(dom);
    $('img').each(function(i, elem) {
        // let imgSrc = $(this).attr('src'); //网页上图片多为相对路径，要加上网页地址
        //let imgSrc = config.url + $(this).attr('src');
        let imgSrc;

        let urlRule = /^\/{2}/;
        let urlRule2 = /^http/;
        if ( urlRule.test( $(this).attr('src') ) ) {
            // 若图片地址为'//'开头，则在前面加上'https:';
            imgSrc = 'https:' + $(this).attr('src');
        } else if ( urlRule2.test( $(this).attr('src') ) ) {
            // 若图片地址以'http'开头，则直接使用
            imgSrc = $(this).attr('src');
        } else {
            // 否则在前面加上config.url
            imgSrc = config.url + $(this).attr('src');
        }
        callback(imgSrc, i);
    });
}

module.exports.findImg = findImg;