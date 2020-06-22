import React, { Component } from "react";
import ReactDom from "react-dom";
import "./index.scss";

import {Router,browserHistory,Route,BrowserRouter} from 'react-router';


import route from "../config/routeConfig";

let routeArr = [];
for(let key in route){

    //处理路由配置文件
    const context = require.context('../page', true, /\.jsx$/);
    //const keys = context.keys();
    const filename = route[key].replace("@page",".");
    const Com = context(filename);
    routeArr.push({
        path:key,
        Com:Com.default
    })
}

var routeContent = <div>
    {routeArr.map((item,index)=>{
        //return <Route path={item.path} key={index} exact component={item.Com}></Route>
        return <Route path={item.path} key={index} exact component={wrap(item.Com)}></Route>
    })}
</div>

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


ReactDom.render(   
    <Router  history={browserHistory}>
        {routeContent}
    </Router>,
    document.getElementById("contain"),
    () => {
        //回调
    }
)
