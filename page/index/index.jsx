import React,{Component} from 'react';
import axios from "axios";


export default class Index extends Component{
    render(){
        return <div>
            <div>{this.state.name2}</div>
            <div>{this.state.name}</div>
            <button onClick={this.handleClick}>点我换一个名字</button>
        </div>
    }

    static async getInitialProps(){
        var result = await axios.post('/api/test',{});
        return result.data
    }

    constructor(props){
        super(props);
        this.state = {
            name:"陈泽",
            name2:props.name
        }
    }

    handleClick = ()=>{
        this.setState({
            name:"改了一个名字"
        });
        
    }

    componentDidMount(){
        // axios.post('/api/test',{},{
        //     headers:{
        //         "Content-Type":"text/plain; charset=utf-8",
        //     }
        // }).then((result)=>{
        //     console.log(result.data)
        // });
    }
}
