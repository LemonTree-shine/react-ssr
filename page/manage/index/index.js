import React,{Component} from 'react';
import axios from "axios";
import Button from "../../../component/button/index";
import { Modal,Input,notification  } from 'antd';
import Form from "../../../component/form/form";
import "./index.scss";

export default class Index extends Component{
    render(){
        let {menuList} = this.state;
        return <div className="home_page">
            <div className="MB_15">
                <Button onClick={this.addMenu}>添加1</Button>
            </div>
            <div className="table_div">
                <table>
                    <thead>
                        <tr>
                            <th width="40px">ID</th>
                            <th>地址</th>
                            <th>名称</th>
                            <th>图标</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menuList.map((item,index)=>{
                            return <tr key={item.id}>
                                <td>{item.id}</td> 
                                <td>{item.linkUrl}</td> 
                                <td>{item.name}</td> 
                                <td>
                                    <div className="iconfont" dangerouslySetInnerHTML={{
                                        __html:item.icon
                                    }}></div>
                                    {item.icon}
                                </td> 
                                <td>
                                    <span className="opration_btn" onClick={this.editMenu.bind(this,item)}>编辑</span>&nbsp;&nbsp;
                                    <span className="opration_btn" onClick={this.deleteMenu.bind(this,item)}>删除</span>
                                </td> 
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
            <Modal
                title={this.state.dialogTitle}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                width={"auto"}
                wrapClassName={"form_ant_modal"}
            >
                <Form ref={(el)=>{this.inputForm = el}}>
                    <div className="form_table_group">
                        {this.state.currentMenu.id?<div className="from_label_group">
                            <div className="label">id：</div>
                            <div className="input_wrap">
                                <Input 
                                    name="id" 
                                    value={this.state.currentMenu.id}
                                    disabled
                                />
                            </div>
                        </div>:""}
                        <div className="from_label_group">
                            <div className="label">名称：</div>
                            <div className="input_wrap">
                                <Input 
                                    name="name" 
                                    value={this.state.currentMenu.name}
                                    onChange={(e)=>{this.changeInputValue("name",e)}}
                                />
                            </div>
                        </div>
                        <div className="from_label_group">
                            <div className="label">连接地址：</div>
                            <div className="input_wrap">
                                <Input 
                                    name="linkUrl" 
                                    value={this.state.currentMenu.linkUrl}
                                    onChange={(e)=>{this.changeInputValue("linkUrl",e)}}
                                />
                            </div>
                        </div>
                        <div className="from_label_group">
                            <div className="label">图标：</div>
                            <div className="input_wrap">
                                <Input 
                                    name="icon" 
                                    value={this.state.currentMenu.icon}
                                    onChange={(e)=>{this.changeInputValue("icon",e)}}
                                />
                            </div>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    }

    static async getInitialProps(req){
        var result = await axios.post('http://127.0.0.1:8080/api/manage/getManageMenu',{
            admin:1
        },{
            headers:{
                'content-type': 'text/plain; charset=UTF-8',
                "cookie":req.headers.cookie || ""
            }
        });

        return {
            menuList:result.data.data
        };
    }

    constructor(props){
        super(props);
        this.state = {
            menuList:props.PAGE_DATA.menuList || [],
            visible:false,
            dialogTitle:"添加菜单",
            currentMenu:{}
        }
    }

    componenthidMount(){
       
    }

    changeInputValue = (key,e)=>{
        let {currentMenu} = this.state;
        currentMenu[key] = e.target.value;
        this.setState({
            currentMenu
        });
    }

    //获取菜单
    getMenu = ()=>{
        axios.post('/api/manage/getManageMenu',{
            admin:1
        },{
            headers:{
                'content-type': 'text/plain; charset=UTF-8'
            }
        }).then((result)=>{
            this.setState({
                menuList:result.data.data
            });
        });
    }

    //添加菜单
    addMenu = ()=>{
        this.setState({
            visible:true,
            dialogTitle:"添加菜单",
            currentMenu:{}
        });
    }

    //弹窗确认
    handleOk = ()=>{
        if(this.inputForm.value.id){
            axios.post('/api/manage/editManageMenu',this.inputForm.value,{
                headers:{
                    'content-type': 'text/plain; charset=UTF-8'
                }
            }).then((result)=>{
                this.setState({
                    visible:false
                },()=>{
                    this.getMenu();
                });
                notification.success({
                    message: result.data.message,
                });
            });
            return;
        }
        axios.post('/api/manage/addManageMenu',this.inputForm.value,{
            headers:{
                'content-type': 'text/plain; charset=UTF-8'
            }
        }).then((result)=>{
            this.setState({
                visible:false
            },()=>{
                this.getMenu();
            });
            notification.success({
                message: result.data.message,
            });
        });
    }

    //编辑
    editMenu = (item)=>{
        this.setState({
            visible:true,
            dialogTitle:"编辑菜单",
            currentMenu:item
        });
    }

    //删除菜单
    deleteMenu = (item)=>{
        Modal.confirm({
            title:"确认删除？",
            onOk:()=>{
                axios.post('/api/manage/deleteManageMenu',{
                    id:item.id
                },{
                    headers:{
                        'content-type': 'text/plain; charset=UTF-8'
                    }
                }).then((result)=>{
                    notification.success({
                        message: result.data.message,
                    });
                    this.getMenu();
                });
            }
        });
    }

    handleCancel = ()=>{
        this.setState({
            visible:false
        });
    }
}
