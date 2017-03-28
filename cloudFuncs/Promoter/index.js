/**
 * Created by yangyang on 2017/3/23.
 */
var AV = require('leanengine');
var Promise = require('bluebird');
var inviteCodeFunc = require('../util/inviteCode')
var IDENTITY_PROMOTER = require('../../constants/appConst').IDENTITY_PROMOTER

/**
 * 用户认证为推广员
 * @param request
 * @param response
 */
function promoterCertificate(request, response) {
  var inviteCode = request.params.inviteCode
  inviteCodeFunc.verifyCode(inviteCode).then((reply) => {
    if (!reply) {
      response.error({
        errcode: 1,
        message: '验证码无效，请向推广员重新获取验证码',
      })
    }
    var currentUser = request.currentUser
    var name = request.params.name
    var phone = request.params.phone
    var cardId = request.params.cardId
    var address = request.params.address
    var upUserId = reply

    var Promoter = AV.Object.extend('Promoter')
    var promoter = new Promoter()
    var upUser = AV.Object.createWithoutData('_User', upUserId)

    upUser.fetch().then((upUserInfo) => {
      console.log('upUserInfo', upUserInfo)
      promoter.set('name', name)
      promoter.set('phone', phone)
      promoter.set('cardId', cardId)
      promoter.set('user', currentUser)
      promoter.set('address', address)
      promoter.set('upUser', upUserInfo)
      promoter.set('payment', 0)      // 表示未完成支付

      currentUser.addUnique('identity', IDENTITY_PROMOTER)
      currentUser.save().then(() => {
        return promoter.save()
      }).then((promoterInfo) => {
        response.success({
          errcode: 0,
          message: '注册推广员成功',
          promoter: promoterInfo,
        })
      }).catch((err) => {
        console.log("promoterCertificate", err.Error)
        response.error({
          errcode: 1,
          message: '注册推广员失败，请与客服联系',
        })
      })
    })
  })
}

/**
 * 获取到用户的上一级推广好友
 * @param request
 * @param response
 */
function getUpPromoter(request, response) {
  var userId = request.params.userId
  var user = AV.Object.createWithoutData('_User', userId)
  var query = new AV.Query('Promoter')
  query.equalTo('user', user)
  query.include('upUser')

  query.first().then((promoter) => {
    var upQuery = new AV.Query('Promoter')
    upQuery.equalTo('user', promoter.attributes.upUser)
    upQuery.include('user')
    upQuery.first().then((upPromoter) => {
      console.log(upPromoter)
      response.success({
        errcode: 0,
        promoter: upPromoter,
      })
    }, (err) => {
      response.error({
        errcode: 1,
        message: "无法获取到上一级推广好友"
      })
    })
  }, (err) => {
    response.error({
      errcode: 1,
      message: "无法获取到次用户的推广记录"
    })
  })
}

function finishPromoterPayment(request, response) {
  var promoterId = request.params.promoterId
  var promoter = AV.Object.createWithoutData('Promoter', promoterId)
  promoter.set('payment', 1)
  promoter.save().then((promoterInfo) => {
    response.success({
      errcode: 0,
      message: '完成支付',
      promoter: promoterInfo,
    })
  }, (err) => {
    response.success({
      errcode: 1,
      message: '支付异常',
    })
  })
}

var PromoterFunc = {
  promoterCertificate: promoterCertificate,
  getUpPromoter: getUpPromoter,
  finishPromoterPayment: finishPromoterPayment,
}

module.exports = PromoterFunc