import React,{Component} from 'react';

export default class Index extends Component{
    render(){
        return <div className="aaa" onClick={this.handleClick}>
            bbbbbbbbbbbb{this.state.name}
            1111
            <img src="/image/demo.png" alt=""/>
        </div>
    }
    
    static async getInitialProps(req){
        // function a(text){
        //     return new Promise((resolve,reject)=>{
        //         setTimeout(()=>{
        //             resolve(text);
        //         },1000)
        //     });
        // }

        // var aa = await a("aa");
        // var bb = await a("bb");

        // return {
        //     a:aa,
        //     b:bb
        // }
    }
    constructor(props){
        super(props);
        this.state = {
            name:"chenze"
        }
    }
    componentDidMount(){

    }

    handleClick = ()=>{
        //alert(123456)
        this.setState({
            name:"来啊啊啊啊啊啊"
        });
    }
}
