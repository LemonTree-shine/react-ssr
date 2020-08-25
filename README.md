"dev": "cross-env NODE_ENV=development webpack --watch",
"build": "cross-env NODE_ENV=production webpack",
"server": "cross-env NODE_ENV=development babel-node server.js"
"server": "cross-env NODE_ENV=production babel-node server.js"

"babel -w page --out-dir serverPage --copy-files",