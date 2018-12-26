### express与mongoDB的使用



全局安装express生成器：

```bash
npm install -g express-generator
```



```bash
$ express --version
4.16.0
```



在当前文件夹下生成一个 express 项目：

```bash
$ express

  warning: the default view engine will not be jade in future releases
  warning: use `--view=jade' or `--help' for additional options


   create : public\
   create : public\javascripts\
   create : public\images\
   create : public\stylesheets\
   create : public\stylesheets\style.css
   create : routes\
   create : routes\index.js
   create : routes\users.js
   create : views\
   create : views\error.jade
   create : views\index.jade
   create : views\layout.jade
   create : app.js
   create : package.json
   create : bin\
   create : bin\www

   install dependencies:
     $ npm install

   run the app:
     $ DEBUG=3:* npm start
```



项目目录：

```
├── bin
|   └── www （执行文件）
├── public  （静态资源）
|   ├── images
|   ├── javascripts
|   └── stylesheets
├── routes  （路由）
|   ├── index.js
|   └── users.js
├── views  （视图模块）
├── app.js （项目入口）
└── package.json
```

