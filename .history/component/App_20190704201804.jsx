import React, {Component} from "react";

export default class App extends Component{
    render(){
        return <div>
            2131321
            <div onClick={this.sayHello}>hello world</div>
        </div>
    }

    sayHello(){
        alert(123)
    }

    aaa = ()=>{
        console.log(123)
    }
}