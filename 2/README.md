### 文件读写操作

读取文件中的城市信息，发送请求查询天气，将天气信息写入文件。



[fs.readFile](http://nodejs.cn/api/fs.html#fs_fs_readfile_path_options_callback) 

```
fs.readFile(path[, options], callback)
```

path，文件路径；options，配置项，文件格式等；callback，处理读取到的数据（参数为读取到的数据）。



[fs.writeFile](http://nodejs.cn/api/fs.html#fs_fs_writefile_file_data_options_callback)

```javascript
fs.writeFile(file, data[, options], callback)
```

path，文件保存路径；data，待写入的数据；options，配置项，文件格式等；callback，写入操作异常时的处理函数，参数为 err。



qs.stringify()将对象序列化成URL的形式，以&进行拼接 



#### JSON.stringify

```javascript
JSON.stringify(value[, replacer[, space]])
```

> `value`，将要序列化成 一个JSON 字符串的值。
>
> `replacer` 可选，如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为null或者未提供，则对象所有的属性都会被序列化；
>
> `space` 可选，指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串(字符串的前十个字母)，该字符串将被作为空格；如果该参数没有提供（或者为null）将没有空格。
>
> [JSON.stringify() 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)