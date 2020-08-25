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
            path: '/admin/admin',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('../page/admin/admin.js').default))
                }, "/admin/admin")
            },
        },{
            path: '/index/index',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('../page/index/index.js').default))
                }, "/index/index")
            },
        },{
            path: '/menu/index',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('../page/menu/index.js').default))
                }, "/menu/index")
            },
        },
        ]
    }