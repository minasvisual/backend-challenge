const scrapeIt = require("scrape-it")
const _ = require('lodash')

module.exports = () => 
{
    let baseDomain = '',
        pagesList = [],
        pagesTree = {},
        validationTypes = {
          urls:[],
          
        },
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
        }

    
    let validadeAsset = (accept, arrData) => {
      let ext;
      return Array.isArray(arrData) && arrData.filter( t => {
         ext = _.get( t.href.match(/\.[0-9a-z]+$/i), '[0]', '').replace('.', '')
         return accept.indexOf(ext.toLowerCase()) > -1
      }).map( x => x.href)
    }
    
    let validatePage = (pageArr) => {
        return pageArr.filter( p => new RegExp(/^(?:[a-z]+:)?\/\//i).test(p.href) === false )
                      .map(x => ( pagesList.indexOf(x.href) === -1 ? pagesList.push(x.href) : '') )
    }
   
    let getPageAssets = ({data, response}) => {
        pagesTree[ _.get(response, 'responseUrl') ] = {
           css: validadeAsset(['css'], data.css),
           js: validadeAsset(['js'], data.js),
           images: validadeAsset(['jpg','gif','svg','png','bitmap','canvas'], data.images),
        }
      
        return pagesTree
    }
    
    let getPageData = (url, objSchema) =>{
        // Promise interface
        return scrapeIt(url, objSchema)
                 .then((data) =>{
                     console.log(data.data)
                     validatePage( data.data.urls )
                     return data;
                 })
                 .then( getPageAssets )
    }
   
    let getPages = (mainUrl) => {
       baseDomain = _.get( mainUrl.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im) ,'[0]' )
       getPageData(mainUrl, schema, (data) => {
           console.log(pagesTree)
       })
    }
    
    return {
       getPages
    };
}
