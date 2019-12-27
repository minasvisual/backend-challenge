const Graph = require('node-dijkstra')

module.exports = () => 
{
  var grid = {}
  var target = '';
  function mountGraph(arr)
  {
      if( !Array.isArray(arr) || (Array.isArray(arr) && arr.length == 0)  ) return false;
      // VALUE 1 = WALK - VALUE 0 = WALL - KEY T1 = TARGET
      for(var i=0; i < arr.length; i++ ){
        for(var y=0; y < arr[i].length; y++ ){
            grid[i+','+y] = { }
          
            if( arr[i][y] == 9 )
              target = i+','+y;

            if( arr[i][y-1] ) //move to left
              grid[i+','+y][i+','+(y-1)] = 1
            if( arr[i-1] && arr[i-1][y] ) //move to up
              grid[i+','+y][(i-1)+','+y] = 1
            if( arr[i][y+1] ) //move to right
              grid[i+','+y][i+','+(y+1)] = 1
            if( arr[i+1] && arr[i+1][y] ) //move to down
              grid[i+','+y][(i+1)+','+y] = 1
         }
        
      }
    
      const route = new Graph(grid)
      
      return route.shortestPath('0,0', target);
  }
  
  
  return {
    mountGraph 
  };
}
