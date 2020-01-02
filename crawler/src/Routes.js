const express = require('express')
const fs = require('fs')

const Router = express.Router()

const Engine = require('./Engine')()

module.exports = () =>
{
    Router.post('/api/get-assets', (req, res) => {
        console.log(req.body)
        if( req.body && req.body.url && new RegExp(/^(?:[a-z]+:)?\/\//i).test(req.body.url) === true ){
          var start = new Date();
          Engine.getPages(req.body.url)
                .then(() =>{
                      console.log("Execution time: ", (new Date() - start))
                      fs.readFile( global.BASEURL+"/results.json", (err, data) =>{ 
                            if(err) res.status(500).send(err.toString()) 
                            else res.send(data) 
                      })           
                })
        }else{
          res.status(412).send("Invalid url")
        }
    })
    
    return Router;
}