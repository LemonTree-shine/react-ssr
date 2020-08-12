var webpack = require("webpack");
var webpackConfig = require("./webpack.config");
var express = require("express");
var path = require("path");
var fs = require("fs");
var hbs = require('hbs');
var http = require("http");
var https = require("https");
var React = require("react");
var axios = require('axios');

//处理的时候忽略引入的样式文件
// require('@babel/register')({
//     'plugins': [
//       [
//         'babel-plugin-transform-require-ignore',
//         {
//           extensions: ['.scss']
//         }
//       ]
//     ]
//   });

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

//判断是开发环境还是生产环境
//console.log(process.env.NODE_ENV);
//development是开发环境，production是生产环境

//开启代理
// configProxy(app);

//配置handlebar模板
app.set('view engine','hbs');
//app.engine('html',hbs.__express);
app.set('views',path.join(__dirname,'dist'));

//设置静态文件路径
app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname,'static')));

//接口请求测试路由
app.use('/api/test',function(req, res){
    res.send(JSON.stringify({name:"小西瓜"}));
})

app.get("*",function(req,res,next){
    //重新获取路由配置文件,该配置只有在开发环境下能走
    delete require.cache[require.resolve("./config/routeConfig")];
    route = require("./config/routeConfig"); 
    next();
});

//路由配置，完全匹配前端路由
for(let path in route){
    //获取当前路由下匹配的组件
    //发布线上模式的时候，所有路由配置在服务启动的时候就加载完成
    //let Com = require(route[path].replace("@page","./serverPage"));

    //添加服务端映射路由配置
    app.get(path, function (req, res){
        // //开发模式下，每次路由进来删除原有的缓存，重新获取新的资源
        delete require.cache[require.resolve(route[path].replace("@page","./serverPage"))];
        let Com = require(route[path].replace("@page","./serverPage"));
        //获取指定组件的静态方法并且执行
        let getInitialProps = Com.default.getInitialProps;

        //储存接口请求返回数据
        let data = {};
        if(getInitialProps){
            //处理异步请求
            data = getInitialProps(req);
            data.then((result)=>{
                res.render("index",{
                    _html:renderToString(<Com.default {...result}/>),
                    _reqData:JSON.stringify(result)
                });
            });
        }else{
            res.render("index",{
                _html:renderToString(<Com.default {...data}/>),
                _reqData:JSON.stringify(data)
            }); 
        }
    });
}

app.get("*",function(req,res,next){
    res.render("index",{
        _html:"",
        _reqData:JSON.stringify({})
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
// HTTPS.listen("443",function(){
//     console.log(`https server run at 443`);
// });


