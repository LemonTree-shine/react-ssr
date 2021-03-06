import React,{Component} from 'react';
import ReactDom from "react-dom";
import { Link } from 'react-router'
import "./admin.scss";
import axios from "axios";

export default class Admin extends Component{
    render(){
        let { expend,menuList,currentPath } = this.state;
        return <div className="admin_page_common_layout">
            <div className={expend?"left_wrap_content":"left_wrap_content unexpend"}>
                <div className="menu_list menu_btn" onClick={this.expendMenu}>
                    <div className="iconfont">&#xe8cc;</div>
                </div>
                {menuList.map((item,index)=>{
                    return <div 
                        className={item.linkUrl.indexOf(currentPath)!=-1?"menu_list active":"menu_list"} 
                        key={item.id}
                        // onClick={()=>{
                        //     window.location.href = item.linkUrl;
                        // }}
                    >
                        <a href={item.linkUrl}>
                            <div className="iconfont" dangerouslySetInnerHTML={{
                                __html:item.icon
                            }}></div>
                            <div className="name">{item.name}</div>
                        </a>
                        {/* <Link to={item.linkUrl}>
                            <div className="iconfont" dangerouslySetInnerHTML={{
                                __html:item.icon
                            }}></div>
                            <div className="name">{item.name}</div>
                        </Link> */}
                    </div>
                })}
            </div>
            <div className="header_wrap_content">
                <div className="login_name">{this.state.loginData.login_name}</div>
            </div>
        </div>
    }

    static async getAdminProps(req){
        var result = await axios.post('http://127.0.0.1:8080/api/manage/getManageMenu',{
            admin:1
        },{
            headers:{
                'content-type': 'text/plain; charset=UTF-8',
                "cookie":req.headers.cookie || ""
            }
        });

        var loginData = await axios.post('http://127.0.0.1:8080/api/getUserInfo',{},{
            headers:{
                'content-type': 'text/plain; charset=UTF-8',
                "cookie":req.headers.cookie || ""
            }
        });


        return {
            adminMenuList:result.data.data,
            loginData:loginData.data.data,
            pathname:req.url.split("?")[0].replace(/\/$/,"")
        };
    }

    constructor(props){
        super(props);
        this.state = {
            expend:true,
            menuList:props.PAGE_DATA.adminMenuList,
            currentPath:props.PAGE_DATA.pathname,
            loginData:props.PAGE_DATA.loginData,
        }
        console.log(props);
    }
    componentWillMount(){
    }
    componentDidMount(){

    }

    expendMenu = ()=>{
        let { expend } = this.state;
        this.setState({
            expend:!expend
        },()=>{
            let contentLayout = document.querySelector(".manage_page_common_content");
            if(this.state.expend){
                contentLayout.className = "manage_page_common_content";
            }else{
                contentLayout.className = "manage_page_common_content unexpend";
            }
        });
    }
}