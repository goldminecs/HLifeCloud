/**
 * Created by lilu on 2017/2/28.
 */
var AV = require('leanengine');
var Promise = require('bluebird');


function getShopCategoryList(request,response) {
  var query = new AV.Query('ShopCategory')
  var categoryList = []
  query.include('containedTag')
  query.ascending('shopCategoryId')
  query.find().then((results)=>{
    results.forEach((result)=>{
      var tags=[]
      console.log('containedTag',result.attributes.containedTag)
      if (result.attributes.containedTag){
        result.attributes.containedTag.forEach((tag)=>{
          var tagInfo={
            id:tag.id,
            name:tag.attributes.name
          }
          tags.push(tagInfo)
        })
      }

      var category = {
        id :result.id,
        imageSource:result.attributes.imageSource,
        shopCategoryId: result.attributes.shopCategoryId,
        containedTag: tags,
        status:result.attributes.status,
        text:result.attributes.text,
        displaySort:result.attributes.displaySort,
        describe:result.attributes.describe,
        showPictureSource:result.attributes.showPictureSource,
        textColor:result.attributes.textColor
      }
      categoryList.push(category)
    })

  },(err)=>{
    response.error(err)
  }).then(()=>{
    response.success(categoryList)
  },(err)=>{
    response.error(err)
  })
}

function getShopTagList(request,response){
  var query = new AV.Query('ShopTag')
  var tagList = []
  query.find().then((results)=>{
      results.forEach((result)=>{
        tagList.push({
          id:result.id,
          name:result.attributes.name
        })
      })
    response.success(tagList)

  },(err)=>{
    response.error(err)
  })
}

function createShopCategory(request,response){
  var query = new AV.Query('ShopCategory')
  query.count().then((count)=>{
    var Category = AV.Object.extend('ShopCategory')
    var category = new Category()
    category.set('imageSource',request.params.imageSource)
    category.set('status',request.params.status)
    category.set('containedTag',request.params.tagList)
    category.set('text',request.params.text)
    category.set('displaySort',request.params.displaySort)
    category.set('describe',request.params.describe)
    category.set('showPictureSource',request.params.showPictureSource)
    category.set('textColor',request.params.textColor)
    category.set('shopCategoryId',count+1)
    category.save().then(()=>{
        response.success()
      },(err)=>{
        response.error(err)
      })
  })
}

function updateShopCategory(request,response){
  var category = AV.Object.createWithoutData('ShopCategory',request.params.id)

    category.set('imageSource',request.params.imageSource)
    category.set('status',request.params.status)
    category.set('containedTag',request.params.tagList)
    category.set('text',request.params.text)
    category.set('displaySort',request.params.displaySort)
    category.set('describe',request.params.describe)
    category.set('showPictureSource',request.params.showPictureSource)
    category.set('textColor',request.params.textColor)
    category.save().then(()=>{
      response.success()
    },(err)=>{
      response.error(err)
    })
}
function createShopTag(request,response){
  var Tag = AV.Object.extend('ShopTag')
  var tag = new Tag()
  tag.set('name',request.params.name)
  tag.save().then(()=>{
    response.success()
  },(err)=>{
    response.error(err)
    }
  )
}
function updateShopTag(request,response){
  var category = AV.Object.createWithoutData('ShopTag',request.params.key)
  category.set('name',request.params.name)
  category.save().then(()=>{
    response.success()
  },(err)=>{
    response.error(err)
  })
}

var ShopManagerFunc = {
  getShopCategoryList: getShopCategoryList,
  getShopTagList:getShopTagList,
  createShopCategory:createShopCategory,
  updateShopCategory:updateShopCategory,
  createShopTag:createShopTag,
  updateShopTag:updateShopTag

}
module.exports = ShopManagerFunc
