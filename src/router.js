
export default {
    path:"/root",
    childRoutes: [
        {
            path: `/root/a`,//首页
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require("../page/A/a").default)
                }, "home")
            }
        },
        {
            path: `/root/b`,//首页
            getComponent: (nextState, cb) => {
                require.ensure([], (require) => {
                    cb(null, require("../page/b").default)
                }, "home")
            }
        },
    ]
};