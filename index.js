const express = require('express')
const bodyParser = require("body-parser")
var app = express();

const routes = require('./src/Routes')()

global.BASEURL = __dirname;
app.use(bodyParser.json())
app.use(express.static( __dirname+'/public'));
app.use(routes);

// console.log( engine.mountGraph([
//   [1,1,1,1],
//   [0,1,1,0],
//   [0,1,0,1],
//   [0,1,9,1],
//   [1,1,1,1]
// ]) )

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});