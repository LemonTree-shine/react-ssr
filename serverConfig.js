var dev = {
    env:"dev",
    port:8090,
    local:"//localhost:8090",
    online:""  //线上地址，待定
};

var uat = {
    env:"uat",
    port:8091,
    local:"//localhost:8091",
    online:""  //线上地址，待定
};

var prd = {
    env:"prd",
    port:8092,
    local:"//localhost:8092",
    online:""  //线上地址，待定
};


module.exports = {
    environment:dev,
    type:"local"  //请求地址类型，线上地址还是本地地址
};