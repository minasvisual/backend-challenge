
# NodeJS Assets Discover
Simple application to discover html assets recursively.
Online demo: http://35.237.207.113:3000/

## Instalation
Run on git bash
```bash
    git clone https://github.com/minasvisual/backend-challenge
	cd backend-challenge/crawler
	npm install
```
## Run as web application
Run on git bash
```bash
    node index
```
Application will be available on browser url http://localhost:3000

Run by HTTP call
POST /api/get-assets
Body:
```json
    { "url": "https://elixir-lang.org/" } 
```

## Run as CLI application
Run on git bash
```bash
    node cli "https://elixir-lang.org/"
```
Application receive an url string to discover all assets. 

Libs used:
- [express](https://expressjs.com/pt-br/ "express") 
- [node scrapeit](https://github.com/IonicaBizau/scrape-it "node scrapeit")
