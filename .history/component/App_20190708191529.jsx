import React, {Component} from "react";

export default class App extends Component{
    render(){
        return <div>
            2131321
            <div onClick={this.sayHello}>hello world</div>
            {this.state.list.map(list=>{
                return <div>{list}</div>
            })}
        </div>
    }
    constructor(){
        super();
        this.state = {
            list:[1,2,3,4]
        }
    }

    sayHello(){
        alert(123)
    }

    aaa = ()=>{
        console.log(123)
    }
}