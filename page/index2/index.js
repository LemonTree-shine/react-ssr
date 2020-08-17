import React,{Component} from 'react';
import axios from "axios";
import "./index.scss";


export default class Index extends Component{
    render(){
        return <div className="home_page">
            1111111111111111
        </div>
    }

    constructor(props){
        super(props);
        this.state = {
            name:props.name
        }
        console.log(123123123123)
    }
}
