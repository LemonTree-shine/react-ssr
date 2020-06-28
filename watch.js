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
            //生成前后端路由的配置文件
            let contentStr = `module.exports = ${JSON.stringify(routeContent)}`;
            fs.writeFileSync("./config/routeConfig.js", contentStr);

            //生成按需加载的前端路由配置文件
            createChunkRouter(routeContent);
        }
    }
}

function createChunkRouter(routeConfig={}){
    let content = "";
    for(let key in routeConfig){
        content+=`{
            path: '${key}',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('${routeConfig[key].replace("@page","../page")}').default))
                }, "${key}")
            },
        },`
    }

    let fileContent = `import React, { Component } from "react";
    function wrap(Com){
        return class extends React.Component{
            render(){
                let newProps = {
                    ...this.props,
                    ...window._reqData
                }
                return <Com {...newProps}/>
            }
        }
    }
    export default {
        childRoutes: [    
            ${content}
        ]
    }`;

    fs.writeFileSync("./router/router.js", fileContent);
}


//监听文件变化出发
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
