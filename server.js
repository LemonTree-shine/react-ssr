

//判断是开发环境还是生产环境
//console.log(process.env.NODE_ENV);
//development是开发环境，production是生产环境
let isDev = false;
if(process.env.NODE_ENV==="development"){
    isDev = true;
}


var express = require("express");
var path = require("path");
var fs = require("fs");
var hbs = require('hbs');
var http = require("http");
var https = require("https");
var React = require("react");
var axios = require('axios');
var request = require('request');
var compression = require('compression')

const {renderToString,renderToStaticMarkup} = require('react-dom/server');

//获取https证书
var privateKey  = fs.readFileSync('./sslFile/private.pem', 'utf8');
var certificate = fs.readFileSync('./sslFile/file.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

var {configProxy} = require("./proxyConfig");   //转发配置文件

var serverInfo = require("./serverConfig");    //服务端配置文件

var route = require("./config/routeConfig");  //路由配置文件

//var createRoure = require("./watch");

var app = express();

//生产环境开启gzip
if(!isDev){
    app.use(compression())
}

//配置服务端渲染文件路径
let build_render_path = "./server_view/page";
let dev_render_path = "./view/page";


//开启代理
configProxy(app);

//配置handlebar模板
app.set('view engine','hbs');
//app.engine('html',hbs.__express);
app.set('views',path.join(__dirname,'dist'));

//设置静态文件路径
app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname,'static')));

app.use("*",function(req,res,next){
    //重新获取路由配置文件,该配置只有在开发环境下能走
    if(isDev){
        delete require.cache[require.resolve("./config/routeConfig")];
        route = require("./config/routeConfig"); 
    }
    next();
});

app.get("/manage/*",function(req,res,next){
    //排除是登录模块
    if(req.url.indexOf("/manage/login")!=-1){
        next()
    }else{
        request.get(`http://127.0.0.1/api/manage/ifLogin`,{
                headers:{
                    'User-Agent':'LemonTree-shine',
                    'cookie':req.headers.cookie
                }
        },function(err,result){
            if(err){
                res.send(JSON.stringify(err));
                return;
            }
            var resultData = JSON.parse(result.body);
            if(isDev){
                next();
                return;
            }
            //判断是否登录
            if(resultData.code==="10001"){
                res.redirect("/manage/login");
            }else{
                next();
            }
            
        })
    }
    
});

//路由配置，完全匹配前端路由
for(let path in route){
    //获取当前路由下匹配的组件
    //发布线上模式的时候，所有路由配置在服务启动的时候就加载完成
    let Com = null;
    let Admin = null;
    if(!isDev){
        Com = require(route[path].replace("@page",build_render_path));
        Admin = require(`${build_render_path}/manage/admin/admin`);
    }

    //添加服务端映射路由配置
    app.get(path, function (req, res){
        // //开发模式下，每次路由进来删除原有的缓存，重新获取新的资源
        if(isDev){
            console.log("是走的开发模式")
            delete require.cache[require.resolve(route[path].replace("@page",dev_render_path))];
            delete require.cache[require.resolve(`${dev_render_path}/manage/admin/admin`)];
            Com = require(route[path].replace("@page",dev_render_path));
            Admin = require(`${dev_render_path}/manage/admin/admin`);
        }
        
        //获取指定组件的静态方法并且执行
        let getInitialProps = Com.default.getInitialProps;
        //获取admin组件的静态方法并且执行
        let getAdminProps = Admin.default.getAdminProps;

        //储存接口请求返回数据
        let data = {};
        let admin = {};
        if(getInitialProps){
            //处理异步请求
            data = getInitialProps(req);
            admin = getAdminProps(req);
            Promise.all([data,admin]).then((result)=>{
                let PAGE_DATA = {
                    ...result[0],
                    ...result[1]
                }
                let json_result = JSON.stringify(PAGE_DATA);
                res.render("index",{
                    _html:renderToString(
                        // <Com.default {...result}/>
                        <div>
                            <Admin.default PAGE_DATA = {PAGE_DATA}/>
                            <div className="manage_page_common_content">
                                <Com.default 
                                    // {...result}
                                    PAGE_DATA = {PAGE_DATA}
                                />
                            </div>
                        </div>
                    ),
                    _reqData:encodeURIComponent(json_result)
                });
            });
        }else{
            admin = getAdminProps(req);
            admin.then((result)=>{
                let PAGE_DATA = result;
                let json_result = JSON.stringify(PAGE_DATA);
                res.render("index",{
                    _html:renderToString(
                        <div>
                            <Admin.default PAGE_DATA = {PAGE_DATA}/>
                            <div className="manage_page_common_content">
                                <Com.default 
                                    PAGE_DATA = {PAGE_DATA}
                                />
                            </div>
                        </div>
                    ),
                    _reqData:encodeURIComponent(json_result)
                });
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
// webpackConfig.mode = "development";
// let compiler = webpack(webpackConfig);


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


