const engine = require('./src/Engine')()
global.BASEURL = __dirname;

let args = process.argv.slice(2);
let url = args[0];
(async function(){
  try{
    if( new RegExp(/^(?:[a-z]+:)?\/\//i).test(url) === true )
      console.log('Result map: ', await engine.getPages(url) )
    else
      console.log('Error: Parameter 3 need to be an url!')
  }catch(e){
      console.log('Error: ', e.toString())
  }
})()