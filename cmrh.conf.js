//const sass = require("node-sass");
const lessParser = require('postcss-less').parse;

module.exports = {
  generateScopedName: "navigation_[local]__[hash:base64:5]",
  extensions: ['.less','.css'],
  processorOpts: {parser: lessParser}
//   extensions: [ '.scss', '.css' ],
//   "preprocessCss": (data, filename) =>
//     sass.renderSync({
//       data,
//       file: filename,
//     }).css,
};