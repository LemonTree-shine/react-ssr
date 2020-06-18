let loaderUtils = require('loader-utils');

/**
 * 通过this可以拿到很多的信息
*/

module.exports = function(source){
    const options = loaderUtils.getOptions(this);
    if(this.resourcePath.indexOf(options.dir)!==-1){
        //console.log(this.resourcePath);
        let filePath = this.resourcePath;
        //console.log(filePath.split("\\"));
        var pathArr = filePath.split("\\");
        return `import "./${pathArr[pathArr.length-1].split(".")[0]}.scss";\n`+source
    }
    return source;
}