## 命令说明
"dev": "cross-env NODE_ENV=development webpack --watch",   开发环境打包命令
"build": "cross-env NODE_ENV=production webpack",    生产环境打包命令
"file": "babel server.js --out-file server_build.js && babel view --out-dir server_view --copy-files",  处理es6语法变成es5预发，可以直接运行
"server_dev": "cross-env NODE_ENV=development babel-node server.js",    启动预发环境服务
"server_p": "babel server.js --out-file server_build.js && babel view --out-dir server_view --copy-files && node server_build.js"       启动生产环境服务

##文件说明
watch.js   监听文件变化生成前后端统一对应路由
static     静态资源文件夹
sslfile    启动https相关服务文件