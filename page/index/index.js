import React,{Component} from 'react';
import axios from "axios";
import { Alert,notification  } from 'antd';
import "./index.scss";


export default class Index extends Component{
    render(){
        return <div className="home_page">
            <div>{this.state.name}</div>
            {/* <img src="/image/demo.png"/> */}
            <button onClick={this.show}>来来来，点我点我</button>
        </div>
    }

    static async getInitialProps(){
        var result = await axios.post('/test',{});
        var article = await axios.post('/api/readArticle',{
            id:"59"
        },{
            headers:{
                'content-type': 'text/plain; charset=UTF-8'
            }
        });

        return article.data.data
    }

    constructor(props){
        super(props);
        this.state = {
            name:props.name
        }
    }

    componentDidMount(){
        // setTimeout(()=>{
        //     this.setState({
        //         name:"牛逼"
        //     })
        // },2000);

        // axios.post('/api/readArticle',{
        //     id:"62"
        // },{
        //     headers:{
        //         'content-type': 'text/plain; charset=UTF-8'
        //     }
        // });

       
    }

    show = ()=>{
        notification.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    }
}
