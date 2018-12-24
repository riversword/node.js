**爬取网页中的图片：**



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