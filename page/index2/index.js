import React,{Component} from 'react';
import axios from "axios";
import "./index.scss";


export default class Index extends Component{
    render(){
        return <div className="home_page">
            <div>{this.state.name}</div>
            {/* <Alert message="Success Tips" type="success" showIcon /> */}
            <img src="/image/demo.png"/>
        </div>
    }

    static async getInitialProps(){
        var result = await axios.post('/api/test',{});
        return result.data
    }

    constructor(props){
        super(props);
        this.state = {
            name:props.name
        }
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                name:"牛逼"
            })
        },2000)
    }
}
