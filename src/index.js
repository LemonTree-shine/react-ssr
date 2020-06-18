import React, { Component } from "react";
import ReactDom from "react-dom";
import "./index.scss";

import {Router,browserHistory,Route,BrowserRouter} from 'react-router';


import {default as routes} from './router';
import B from "../page/b";
import A from "../page/A/a";



ReactDom.render(   
    <Router  history={browserHistory}>
        <Route path='/root/b' exact component={B}></Route>
        <Route path='/root/a' exact component={A}></Route>
    </Router>,
    //<Router history={browserHistory} routes={routes}></Router>,
    //<B/>,
    document.getElementById("contain"),
    () => {
        //回调
    }
)
