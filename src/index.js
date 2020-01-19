import React, { Component } from "react";
import ReactDom from "react-dom";

import {Router,browserHistory} from 'react-router';


import {default as routes} from './router';



ReactDom.render(   
    <Router history={browserHistory} routes={routes}></Router>,
    document.getElementById("contain"),
    () => {
        //回调
    }
)
