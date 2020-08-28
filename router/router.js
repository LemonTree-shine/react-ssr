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
            path: '/manage/admin/admin',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('../page/manage/admin/admin.js').default))
                }, "/manage/admin/admin")
            },
        },{
            path: '/manage/index/index',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('../page/manage/index/index.js').default))
                }, "/manage/index/index")
            },
        },{
            path: '/manage/menu/index',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('../page/manage/menu/index.js').default))
                }, "/manage/menu/index")
            },
        },
        ]
    }