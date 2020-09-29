import React,{Component} from 'react';
import axios from "axios";
import { Modal,Input,notification  } from 'antd';
import "./index.scss";

export default class Index extends Component{
    render(){
        return <div className="theme_color_page">
            {this.state.themeList.map((item,index)=>{
                return <div className="theme_item" 
                    key={index} 
                    style={{
                        background:item.color
                    }}
                    onClick={(()=>{
                        this.setTheme(item);
                    })}
                ></div>
            })}
        </div>
    }

    constructor(){
        super();
        this.state = {
            themeList:[{
               color:'rgba(50, 177, 108, 1)' ,
               value:'green'
            },{
                color:'rgba(40,154,64, 1)' ,
                value:'dark_green'
             },{
                color:'rgba(0, 188, 212, 1)' ,
                value:'blue'
             },{
                color:'rgba(254, 71, 114, 1)' ,
                value:'pink'
             },{
                color:'rgba(163, 124, 67, 1)' ,
                value:'brown'
             }] 
        }
    }

    setTheme = (item)=>{
        console.log(this.props.PAGE_DATA);
        let userInfo = this.props.PAGE_DATA;
        //判断是否登录
        if(!userInfo.id){
            notification.error({
                message: '用户并没有登录，请先登录'
            });
            return;
        }

        axios.post('/api/manage/setTheme',{
            theme:item.value,
            id:userInfo.id || 35
        },{
            headers:{
                'content-type': 'text/plain; charset=UTF-8'
            }
        }).then((result)=>{

            document.body.className = `admin-theme-${item.value}`;
            
            notification.success({
                message: result.data.message,
            });
        });
        
    }
}