const fs = require('fs'); //文件操作
const request = require('request'); //发送请求
const qs = require('querystring'); //组装url


//读取ip文件   回调函数-->
function readIP(path, callback) {
    fs.readFile(path, function(err, data) {
        if (err) {
            callback(err);
        } else {
            try {
                data = JSON.parse(data);
                callback(null, data);
            } catch (error) {
                callback(error);
            }
        }
    });
}

//通过telize公共GEO服务获取城市信息
function ip2geo(ip, callback) {
    var url = 'http://www.telize.com/geoip/' + ip;
    request({
        url: url,
        json: true
    }, function(err, resp, body) {
        callback(err, body);
    }
    );
}

//获取当地天气信息
function geo2weather(lon, lat, callback) {
    var params = {
        city: lon + ',' + lat,
        key: ''
    };
    var url = 'https://free-api.heweather.com/v5/weather?' + qs.stringify(params);
    request({
        url: url,
        json: true,
    }, function (err, resp, body) {
        callback(err, body);
    }
    );
}

//并行处理多个ip
function geos2weathers(geos, callback) {
    var weathers = [];
    var geo;
    var remain = geos.length;
    for (var i=0; i<geos.length; i++) {
        geo = geos[i];
        (function (geo) {
            geo2weather(geo.latitude, geo.longitude, function(err, weather) {
                if (err) {
                    callback(err);
                } else {
                    weather.geo = geo;
                    weathers.push(weather);
                    remain--;
                }

                if (remain == 0) { //remian等于0时，即请求结束
                    callback(null, weathers);
                }
            });
        })(geo)
    }
}


//将结果写入weather.json
function writeWeather(weathers, callback) {
    var output = [];
    var weather;

    for (var i=0; i < weathers.length; i++) {
        weather = weathers[i];
        output.push({
            ip: weather.geo.ip,
            weather: weather.weather[0].main,
            region: weather.geo.region
        });
    }

    //将结果写入weather.json
    fs.writeFile('./weather.json', JSON.stringify(output, null, ' '), callback)
}