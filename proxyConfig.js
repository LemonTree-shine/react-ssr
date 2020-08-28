var fs = require("fs");
var proxy = require("http-proxy");

var packageInfo = fs.readFileSync("./package.json",{
    encoding:"utf-8"
});

function configProxy(app){
    var getTarget = JSON.parse(packageInfo).target;

    if(!getTarget){
        return;
    }
    
    var Proxy = proxy.createProxyServer({
        changeOrigin: true
    });


    app.use("/api/*",function(req,res){
        Proxy.web(req,res,{
            //转发请求
            target:getTarget+req.originalUrl
            //target:getTarget
        })
    });

    Proxy.on('proxyReq', function (proxyReq, req, res, options) {
        //同步cookie
        //proxyReq.setHeader("cookie", 'Login_session=s%3A_ZUOhjPR80WpyG2mF1DFZ_iE8Ehfu8PA.t11KOBUWkRK3Ob%2FfEq8V7XxMKP%2BHfPkjNoKLbDolpXM');
    });
    Proxy.on('error',(e)=>{
        console.log(e);
    })
}

module.exports = {
    configProxy:configProxy
}