const express = require('express')

const Router = express.Router()

const engine = require('./Engine')()

module.exports = () =>
{
    Router.post('/api/getAssets', (req, res) => {
        
    })
    
    return Router;
}