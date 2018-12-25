### 爬取网页中的图片：

在config.js中设置待爬取的网址：

```javascript
const url = 'https://www.imooc.com'; // 待爬取的网址
```

执行：

```bash
node index.js
```



原理：

请求一个网页——>获取到整个html文档——>查询到每一个img元素，传给处理函数。

处理函数：下载图片并保存至本地。



---



### index.js

`.pop()`  方法会删除并返回数组的最后一个元素 。

[request](https://www.npmjs.com/package/request#streaming) 可以对响应结果做流式处理。

pipe 方法，`readableSrc.pipe(writableDest) ` ，要求管道的上游（readableSrc）是可读流，管道的下游（writableDest）是可写流。

[fs.createWriteStream(path[, options])](http://nodejs.cn/api/fs.html#fs_fs_createwritestream_path_options)  方法会返回一个可写流，

```javascript
let ext = imgUrl.split('.').pop();
request(imgUrl).pipe(fs.createWriteStream( path.join(config.imgDir, i + '.' + ext), { 'encoding': 'utf-8' } ) );
```

