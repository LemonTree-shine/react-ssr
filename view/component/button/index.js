import React from "react";
import "./index.scss";

export default class Index extends React.Component{
    render(){
        return <div 
            className="manage_common_btn"
            onClick={()=>{
                this.props.onClick&&this.props.onClick()
            }}
        >
            {this.props.children}
        </div>;
    }
}