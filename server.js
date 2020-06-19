var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var express = require("express");
var path = require("path");
var fs = require("fs");
var hbs = require('hbs');
var http = require("http");
var https = require("https");
var React = require("react");

const {renderToString,renderToStaticMarkup} = require('react-dom/server');

//获取https证书
var privateKey  = fs.readFileSync('./sslFile/private.pem', 'utf8');
var certificate = fs.readFileSync('./sslFile/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var {configProxy} = require("./proxyConfig");   //转发配置文件

var serverInfo = require("./serverConfig");    //服务端配置文件

var route = require("./config/routeConfig");  //路由配置文件

var createRoure = require("./watch");

var app = express();

configProxy(app);

//配置handlebar模板
app.set('view engine','hbs');
//app.engine('html',hbs.__express);
app.set('views',path.join(__dirname,'dist'));

//设置静态文件路径
app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname,'static')));

//路由配置，完全匹配前端路由
for(let path in route){
    //获取当前路由下匹配的组件
    let Com = require(route[path].replace("@page","./page"));
    
    //添加服务端映射路由配置
    app.get(path, function (req, res){
        //获取指定组件的静态方法并且执行
        let getInitialProps = Com.default.getInitialProps;

        //储存接口请求返回数据
        let data = {};
        if(getInitialProps){
            //处理异步请求
            data = getInitialProps(req);
            data.then((result)=>{
                res.render("index",{
                    _html:renderToString(<Com.default/>),
                });
            });
        }else{
            res.render("index",{
                _html:renderToString(<Com.default/>),
            }); 
        }
    });
}

//没有匹配到前端路由的统一走默认的模板
app.get('*', function (req, res){
    res.render("index",{
        _html:"",
    });
});

var HTTP = http.createServer(app);
var HTTPS = https.createServer(credentials,app);

//默认配置webpack开发环境
webpackConfig.mode = "development";
let compiler = webpack(webpackConfig);


//监听事件
HTTP.listen(serverInfo.environment.port,function(){
    console.log(`server run at ${serverInfo.environment.port}`);
    //createRoure();
    // compiler.watch({},function(err, stats){
    //     console.log(stats.toString({
    //         colors:true
    //     }));
    // });
});

//监听事件
HTTPS.listen("443",function(){
    console.log(`https server run at 443`);
});


