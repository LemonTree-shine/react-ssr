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
var B = require("./page/b");

//获取https证书
var privateKey  = fs.readFileSync('./sslFile/private.pem', 'utf8');
var certificate = fs.readFileSync('./sslFile/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var {configProxy} = require("./proxyConfig");

var serverInfo = require("./serverConfig");

var app = express();

configProxy(app);

//配置handlebar模板
app.set('view engine','hbs');
//app.engine('html',hbs.__express);
app.set('views',path.join(__dirname,'dist'));

//设置静态文件路径
app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname,'static')));

// //所有路由请求都经过这里
// app.get('*', function (req, res){
//     res.render("index");
// });

//所有路由请求都经过这里
app.get('/root/b', function (req, res){
    
    let getInitialProps = B.default.getInitialProps;
    console.log(getInitialProps);
    let data = {};
    if(getInitialProps){
        //处理异步请求
        data = getInitialProps();
        data.then((result)=>{
            res.render("index",{
                _html:renderToString(<B.default/>),
            });
        });
    }else{
        console.log(123123123123);
        res.render("index",{
            _html:renderToString(<B.default/>),
        }); 
    }

    
});

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
    console.log(serverInfo);
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


