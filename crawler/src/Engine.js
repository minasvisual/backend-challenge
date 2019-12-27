const scrapeIt = require("scrape-it")
const _ = require('lodash')

module.exports = () => 
{
    let pagesList,
        pagesTree,
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
    
    
    let getPageAssets = ({data, response}) => {
           
    }
    
    let validadeAsset = (accept, arrData) => {
      let ext;
      return arrData.filter( t => {
         ext = _.get( t.match(/\.[0-9a-z]+$/i), '[0]', '').replace('.', '')
         return accept.indexOf(ext) > -1
      })
    }
    
    let validatePage = (pageArr) => {
        return pageArr.filter( p => new RegExp(/^(?:[a-z]+:)?\/\//i).test(p) === false && pagesList.indexOf(p) === -1 )
    }
    
    let getPageData = (url, objSchema) =>{
        // Promise interface
        return scrapeIt(url, objSchema)
                 .then((data) =>{
                     pagesList = validatePage( data.urls )
                     return data;
                 })
                 .then( getPageAssets )
    }
   
    let getPages = (mainUrl) => {
       getPageData(mainUrl, schema)
    }
    
    return {
       getPages
    };
}
