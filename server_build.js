"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

require("@babel/register");

var express = require("express");

var path = require("path");

var fs = require("fs");

var hbs = require('hbs');

var http = require("http");

var https = require("https");

var React = require("react");

var axios = require('axios');

var request = require('request'); // var CryptoJS = require("crypto-js");
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


var _require = require('react-dom/server'),
    renderToString = _require.renderToString,
    renderToStaticMarkup = _require.renderToStaticMarkup; //获取https证书


var privateKey = fs.readFileSync('./sslFile/private.pem', 'utf8');
var certificate = fs.readFileSync('./sslFile/file.crt', 'utf8');
var credentials = {
  key: privateKey,
  cert: certificate
};

var _require2 = require("./proxyConfig"),
    configProxy = _require2.configProxy; //转发配置文件


var serverInfo = require("./serverConfig"); //服务端配置文件


var route = require("./config/routeConfig"); //路由配置文件


var createRoure = require("./watch");

var app = express(); //判断是开发环境还是生产环境
//console.log(process.env.NODE_ENV);
//development是开发环境，production是生产环境

var isDev = true;

if (process.env.NODE_ENV === "production") {
  isDev = false;
} //开启代理


configProxy(app); //配置handlebar模板

app.set('view engine', 'hbs'); //app.engine('html',hbs.__express);

app.set('views', path.join(__dirname, 'dist')); //设置静态文件路径

app.use(express["static"](path.join(__dirname, 'dist')));
app.use(express["static"](path.join(__dirname, 'static')));
app.use("*", function (req, res, next) {
  //重新获取路由配置文件,该配置只有在开发环境下能走
  if (isDev) {
    delete require.cache[require.resolve("./config/routeConfig")];
    route = require("./config/routeConfig");
  }

  next();
});
app.get("/manage/*", function (req, res, next) {
  //排除是登录模块
  if (req.url.indexOf("/manage/login") != -1) {
    next();
  } else {
    request.get("http://127.0.0.1/api/manage/ifLogin", {
      headers: {
        'User-Agent': 'LemonTree-shine',
        'cookie': req.headers.cookie
      }
    }, function (err, result) {
      if (err) {
        res.send(JSON.stringify(err));
        return;
      }

      var resultData = JSON.parse(result.body); //判断是否登录

      if (resultData.code === "10001") {
        res.redirect("/manage/login");
      } else {
        next();
      }
    });
  }
}); //路由配置，完全匹配前端路由

var _loop = function _loop(_path) {
  //获取当前路由下匹配的组件
  //发布线上模式的时候，所有路由配置在服务启动的时候就加载完成
  var Com = null;
  var Admin = null;

  if (!isDev) {
    Com = require(route[_path].replace("@page", "./serverPage"));
    Admin = require("./serverPage/manage/admin/admin");
  } //添加服务端映射路由配置


  app.get(_path, function (req, res) {
    // //开发模式下，每次路由进来删除原有的缓存，重新获取新的资源
    if (isDev) {
      console.log("是走的开发模式");
      delete require.cache[require.resolve(route[_path].replace("@page", "./serverPage"))];
      delete require.cache[require.resolve('./serverPage/manage/admin/admin')];
      Com = require(route[_path].replace("@page", "./serverPage"));
      Admin = require("./serverPage/manage/admin/admin");
    } //获取指定组件的静态方法并且执行


    var getInitialProps = Com["default"].getInitialProps; //获取admin组件的静态方法并且执行

    var getAdminProps = Admin["default"].getAdminProps; //储存接口请求返回数据

    var data = {};
    var admin = {};

    if (getInitialProps) {
      //处理异步请求
      data = getInitialProps(req);
      admin = getAdminProps(req);
      Promise.all([data, admin]).then(function (result) {
        var PAGE_DATA = _objectSpread(_objectSpread({}, result[0]), result[1]);

        var json_result = JSON.stringify(PAGE_DATA);
        res.render("index", {
          _html: renderToString(
          /*#__PURE__*/
          // <Com.default {...result}/>
          React.createElement("div", null, /*#__PURE__*/React.createElement(Admin["default"], {
            PAGE_DATA: PAGE_DATA
          }), /*#__PURE__*/React.createElement("div", {
            className: "manage_page_common_content"
          }, /*#__PURE__*/React.createElement(Com["default"], {
            // {...result}
            PAGE_DATA: PAGE_DATA
          })))),
          _reqData: encodeURIComponent(json_result)
        });
      });
    } else {
      admin = getAdminProps(req);
      admin.then(function (result) {
        var PAGE_DATA = result;
        var json_result = JSON.stringify(PAGE_DATA);
        res.render("index", {
          _html: renderToString( /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Admin["default"], {
            PAGE_DATA: PAGE_DATA
          }), /*#__PURE__*/React.createElement("div", {
            className: "manage_page_common_content"
          }, /*#__PURE__*/React.createElement(Com["default"], {
            PAGE_DATA: PAGE_DATA
          })))),
          _reqData: encodeURIComponent(json_result)
        });
      });
    }
  });
};

for (var _path in route) {
  _loop(_path);
}

app.get("*", function (req, res, next) {
  res.render("index", {
    _html: "",
    _reqData: JSON.stringify({})
  });
});
var HTTP = http.createServer(app);
var HTTPS = https.createServer(credentials, app); //默认配置webpack开发环境
// webpackConfig.mode = "development";
// let compiler = webpack(webpackConfig);
//监听事件

HTTP.listen(serverInfo.environment.port, function () {
  console.log("server run at ".concat(serverInfo.environment.port)); //createRoure();
  // compiler.watch({},function(err, stats){
  //     console.log(stats.toString({
  //         colors:true
  //     }));
  // });
}); //监听事件
// HTTPS.listen("443",function(){
//     console.log(`https server run at 443`);
// });
