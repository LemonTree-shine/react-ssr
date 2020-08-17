import React,{Component} from 'react';
import ReactDom from "react-dom";
import "./admin.scss";

export default class Admin extends Component{
    render(){
        return <div>
            我是公共的admin
        </div>
    }

    constructor(){
        super();
        //console.log("asdasdasdasd你在说什么,什么都觉得");
    }
    componentDidMount(){
        //console.log(123);
    }
}