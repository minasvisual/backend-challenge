const express = require('express')

const Router = express.Router()

const engine = require('./Engine')()

module.exports = () =>
{
    Router.post('/api/calculate', (req, res) => {
        if( !req.body || !Array.isArray(req.body) ){
          res.status(412).send({message:'The payload need to be an array'})
          return;
        }
        
        var results = engine.mountGraph(req.body)
        
        res.send(results)
    })
    
    return Router;
}