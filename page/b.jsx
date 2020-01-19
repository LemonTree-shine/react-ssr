import React,{Component} from 'react';
//import "./b.scss";


export default class Index extends Component{
    render(){
        return <div className="aaa" onClick={()=>{alert(123)}}>
            bbbbbbbbbbbb{this.stat.name}
            {/* <img src={imgPath+"/static/image/logo5.png"}/> */}
        </div>
    }
    constructor(){
        super();
        this.state = {
            name:"chenze"
        }
    }
    componentDidMount(){

    }
}
