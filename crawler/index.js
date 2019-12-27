const express = require('express')
const bodyParser = require("body-parser")
var app = express();

const routes = require('./src/Routes')()

// global.BASEURL = __dirname;
// app.use(bodyParser.json())
// app.use(express.static( __dirname+'/public'));
// app.use(routes);

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

const Engine = require('./src/Engine')()

Engine.getPages('https://elixir-lang.org/')