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
                        className={currentPath===item.linkUrl?"menu_list active":"menu_list"} 
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
                <div className="login_name">admin</div>
            </div>
        </div>
    }

    constructor(props){
        super(props);
        this.state = {
            expend:true,
            menuList:[],
            currentPath:""
        }
    }
    componentDidMount(){
        this.getManageMenu();
    }

    async getManageMenu(){
        var result = await axios.post('/api/manage/getManageMenu',{
            admin:1
        },{
            headers:{
                'content-type': 'text/plain; charset=UTF-8'
            }
        });
        this.setState({
            menuList:result.data.data,
            currentPath:this.props.location.pathname
        });
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