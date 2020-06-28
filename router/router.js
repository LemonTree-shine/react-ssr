import React, { Component } from "react";
    function wrap(Com){
        return class extends React.Component{
            render(){
                let newProps = {
                    ...this.props,
                    ...window._reqData
                }
                return <Com {...newProps}/>
            }
        }
    }
    export default {
        childRoutes: [    
            {
            path: '/index/index',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('../page/index/index.jsx').default))
                }, "/index/index")
            },
        },
        ]
    }