
# NodeJS Route Calculator 
Simple application to calculate the shortest route between 2D array nodes.
Online demo: http://35.237.207.113:3000/

## Instalation
Run on git bash
```bash
    git clone https://github.com/minasvisual/backend-challenge
	cd backend-challenge
	npm install
```
## Run as web application
Run on git bash
```bash
    node index
```
Application will be available on browser url http://localhost:3000

## Run as CLI application
Run on git bash
```bash
    node cli "[[1,1,1,1],[0,1,1,0],[0,1,0,1],[0,1,9,1],[1,1,1,1]]"
```
Application receive an array as json string to be calculate the shortest route. 

Libs used:
- [express](https://expressjs.com/pt-br/ "express") 
- [node djikstra](https://github.com/albertorestifo/node-dijkstra "node djikstra")