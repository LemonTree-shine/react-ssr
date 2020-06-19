var watch = require('node-watch');
var fs = require('fs');

var routeContent = {};


function createRouter(path){
    var stat = fs.lstatSync(path);
    if(stat.isDirectory()){
        var fileList = fs.readdirSync(path);
        //console.log(fileList);
        fileList.forEach((name)=>{
            createRouter(path+"/"+name)
        });
    }else{
        if(/\.jsx?$/.test(path)){
            routeContent[path.replace(/\.\/page/,"").replace(/\.jsx?$/,"")] = path.replace("./page","@page");

            let contentStr = `module.exports = ${JSON.stringify(routeContent)}`;
            fs.writeFileSync("./config/routeConfig.js", contentStr);
        }
    }
}

function didCreateRoure(){
    routeContent = {}
    createRouter('./page');
    watch('./page', { recursive: true }, function(evt, name) {
        routeContent = {}
        createRouter('./page');
    });

    console.log("成功监听page文件夹");
}

//初始化路由
didCreateRoure();

module.exports = didCreateRoure;
