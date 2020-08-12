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
                    cb(null, wrap(require('../page/index/index.js').default))
                }, "/index/index")
            },
        },{
            path: '/index2/index',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('../page/index2/index.js').default))
                }, "/index2/index")
            },
        },
        ]
    }