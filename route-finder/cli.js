const engine = require('./src/Engine')()

let args = process.argv.slice(2);
let arr = args[0];

try{
  arr = JSON.parse(arr)  

  if( Array.isArray(arr) )
    console.log('Result array path: ', engine.mountGraph(arr) )
  else
    console.log('Error: Parameter 3 need to be an array!')
}catch(e){
    console.log('Error: ', e.toString())
}