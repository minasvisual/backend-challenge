const scrapeIt = require("scrape-it")
const _ = require('lodash')
const Url = require('url');
const fs = require('fs');

module.exports = () => 
{
    let baseDomain = '',      //baseurl domain
        processing = false,   //batch flag
        pagesList = [],       //url queue
        pagesTree = {},       //result object
        schema = {
           urls:{
              listItem: "a",
              data: {
                href:{
                  attr:"href"
                }
              }
           }, 
          css:{
              listItem: "link",
              data: {
                href:{
                  attr:"href" 
                }
              }
           },
           js:{
              listItem: "script",
              data: {
                href:{
                  attr:"src" 
                }
              }
           },
           images:{
              listItem: "img",
              data: {
                href:{
                  attr:"src" 
                }
              }
           }
        }         //page scrawler schema

    // filter and validate assets 
    let validadeAsset = (accept, arrData) => {
      let ext;
      return Array.isArray(arrData) && arrData.filter( t => {
         ext = _.get( t.href.match(/\.[0-9a-z]+$/i), '[0]', '').replace('.', '')
         return accept.indexOf(ext.toLowerCase()) > -1
      }).map( x => x.href)
    }
    
    // filter and validate URLs
    let getUrls = (pageArr) => {
        return pageArr.map( p =>{
 						p.href = p.href.replace(baseDomain, '/')
            let ext = _.get( p.href.match(/\.[0-9a-z]+$/i), '[0]')
            if(  new RegExp(/^(?:[a-z]+:)?\/\//i).test(p.href) === false
                 && new RegExp(/\S+@\S+\.\S+/).test(p.href) === false
                 && new RegExp(/\S+#\S+/).test(p.href) === false
                 && pagesList.indexOf(p.href) == -1 
                 && Object.keys(pagesTree).indexOf( p.href ) == -1
                 && ( !ext || ext && ['.html', '.htm'].indexOf( ext.toLowerCase() ) > -1 ) 
              ) pagesList.push( p.href ) 
        })
    }
    
    // mount response item structure 
    let getPageAssets = ({data, response}) => {
        let url = _.get(response, 'responseUrl', '')
        let pathUrl = url.replace(baseDomain, '')
      
        pagesTree[ pathUrl ] = {
           css: validadeAsset(['css'], data.css),
           js: validadeAsset(['js'], data.js),
           images: validadeAsset(['jpg','gif','svg','png','bitmap','favicon','tiff'], data.images),
        }
        
        return pagesTree
    }
    
    // reqquest page and orchertrate flow
    let getPageData = (url, objSchema) =>{
        // Promise interface
        console.log('Processing url:', url)
        return scrapeIt(url, objSchema)
                 .then((data) =>{
                     getUrls( data.data.urls )
                     return data;
                 })
                 .then( getPageAssets )
                 .catch(console.log)
    }
    
    // recursive callback to control page levels
    let count = 0
    let callback = (data) => {
          if( count < 3 && _.difference(pagesList, Object.keys(pagesTree)).length > 0 )
          {
            processing = true;
            let promises = _.difference(pagesList, Object.keys(pagesTree))
                              .map( x =>  getPageData( Url.resolve(baseDomain, x), schema) )
            Promise.all(promises)
                .then((data) =>{ 
                    processing = false
                    count++
                    return data
                })
                .then(callback)
                
          }else if( processing === false )
          {
              fs.writeFile( global.BASEURL+"/results.json", JSON.stringify(pagesTree), function(err) {
                  if(err) {
                      return console.log(err);
                  }
                  console.log("The file was saved!");
              }); 
              console.log("finished")
          }
     }
   
    // start control funcion
    let getPages = (mainUrl, cb) => {
       baseDomain = _.get( mainUrl.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im) ,'[0]' )
      
       getPageData(mainUrl, schema).then(callback)
    }
    
    return {
       getPages,
       getPageData
    };
}