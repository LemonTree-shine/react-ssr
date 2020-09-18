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
            path: './view/page/manage/admin/admin',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('./view/page/manage/admin/admin.js').default))
                }, "./view/page/manage/admin/admin")
            },
        },{
            path: './view/page/manage/index/index',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('./view/page/manage/index/index.js').default))
                }, "./view/page/manage/index/index")
            },
        },{
            path: './view/page/manage/menu/index',
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, wrap(require('./view/page/manage/menu/index.js').default))
                }, "./view/page/manage/menu/index")
            },
        },
        ]
    }