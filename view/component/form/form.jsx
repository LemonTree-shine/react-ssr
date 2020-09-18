import React from "react";
import "./form.scss";

export default class Index extends React.Component{
    render(){
        return <div>
            <form ref={(el)=>{this.form = el}}>
                {this.props.children}
            </form>
        </div>
    }

    get value(){
        let allInput = this.form.querySelectorAll("input");
        let formData = {};
        allInput.forEach((input)=>{
            if(input.type==="text"&&input.name){
                formData[input.name] = input.value;
            }
            if(input.type==="radio"&&input.name&&input.checked){
                formData[input.name] = input.value;
            }
            if(input.type==="checkbox"&&input.name&&input.checked){
                //formData[input.name] = input.value;
                if(formData[input.name]){
                    formData[input.name].push(input.value);
                }else{
                    formData[input.name] = [input.value];
                }
            }
        });

        return formData;
    }
}