var dev = {
    env:"dev",
    port:8080,
    local:"//127.0.0.1:8080",
    online:""  //线上地址，待定
};

var uat = {
    env:"uat",
    port:8091,
    local:"//127.0.0.1:8091",
    online:""  //线上地址，待定
};

var prd = {
    env:"prd",
    port:8092,
    local:"//127.0.0.1:8092",
    online:""  //线上地址，待定
};


module.exports = {
    environment:dev,
    type:"local"  //请求地址类型，线上地址还是本地地址
};