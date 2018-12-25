const fs = require('fs'); //文件操作
const request = require('request'); //发送请求
const qs = require('querystring'); //组装url


//读取city文件   callback-->citys2weathers
function readCity(path, callback) {
    fs.readFile(path, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            try {
                console.log(data);
                var result = JSON.parse(data);
                console.log(result);
                callback(result);

            } catch (error) {
                console.log(error);
            }
        }
    });
}


//获取当地天气信息
function city2weather(city, callback) {
    var param = {
        city: city,
        key: ''
    }
    var url = 'https://free-api.heweather.com/v5/weather?' + qs.stringify(param);
    // qs.stringify()将对象 序列化成URL的形式，以&进行拼接
    request({
        url: url,
        json: true,
    }, function (err, res, body) {
       console.log("开始请求天气"); 
       if (!err && res) {
            console.log(body);
            callback(body);
       }
    }
    );
}

//并行处理多个city， callback-->writeWeather
function citys2weathers(citys) {
    var weathers = [];
    var city;
    var remain = citys.length;
    for (var i=0; i < citys.length; i++) {
        let city = citys[i];
        // (function (city) {
        //     city2weather(city, function(weather) {
        //         try {
        //             remain--;
        //             var weatherItem = {};
        //             weatherItem.city = city;
        //             weatherItem.weather = weather;
        //             weathers.push(weatherItem);
        //         } catch (error) {
        //             console.log(error);
        //         }

        //         if( remain == 0 ){
        //             writeWeather(weathers);
        //         }
        //     });
        // })(city)
        city2weather(city, function(weather) {
            try {
                remain--;
                var weatherItem = {};
                weatherItem.city = city;
                weatherItem.weather = weather;
                weathers.push(weatherItem);
            } catch (error) {
                console.log(error);
            }

            if( remain == 0 ){
                writeWeather(weathers);
            }
        });
    }

   // writeWeather(weathers);
}


//将结果写入weather.json
function writeWeather(weathers) {
    // var output = [];
    // var weather;

    // for (var i=0; i < weathers.length; i++) {
    //     weather = weathers[i];
    //     output.push({
    //         ip: weather.geo.ip,
    //         weather: weather.weather[0].main,
    //         region: weather.geo.region
    //     });
    // }

    console.log("weathers="+weathers);

    //将结果写入weather.json
    fs.writeFile('./weather.json', JSON.stringify(weathers, null, ' '), (err) => {
        if (err) throw err;
        console.log("写入完成");
    });
}

//读取城市列表，根据城市列表请求天气信息，将天气信息写入文件
readCity('./city.json', citys2weathers);