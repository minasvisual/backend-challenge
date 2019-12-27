const scrapeIt = require("scrape-it")
const _ = require('lodash')
const Url = require('url');

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
        let url = Url.resolve(_.get(response, 'responseUrl', ''), baseDomain)
        let pathUrl = url.replace(baseDomain, '')
      
        pagesTree[ url ] = {
           css: validadeAsset(['css'], data.css),
           js: validadeAsset(['js'], data.js),
           images: validadeAsset(['jpg','gif','svg','png','bitmap','canvas'], data.images),
        }
        
        if( pagesList.indexOf( pathUrl ) > -1 ) pagesList.splice( pagesList.indexOf( pathUrl ), 1 )
      
        return pagesTree
    }
    
    let getPageData = (url, objSchema) =>{
        // Promise interface
        return scrapeIt(url, objSchema)
                 .then((data) =>{
                     validatePage( data.data.urls )
                     return data;
                 })
                 .then( getPageAssets )
    }
   
    let getPages = (mainUrl) => {
       let count = 0
       baseDomain = _.get( mainUrl.match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im) ,'[0]' )
       getPageData(mainUrl, schema)
         .then((data) => {
              if( pagesList.length > 0 && count < 1){
                pagesList.map( x => getPageData(x, schema) )
                count++
              }
         })
    }
    
    return {
       getPages
    };
}
