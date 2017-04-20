/**
 * Created by yangyang on 2017/3/24.
 */

// redis配置
var REDIS_URL = "120.77.220.234"
var REDIS_PORT = 6379
var DEBUG_REDIS = 0
var PRE_REDIS = 1
var PROD_REDIS = 2
var REDIS_DB = 0
var REDIS_AUTH = "Simors2017"

// mysql数据库配置
var MYSQL_HOST = '120.77.220.234'
var MYSQL_USER = ''
var MYSQL_PWD = ''
var MYSQL_DB = ''
var MYSQL_DEV_USER = 'simors'
var MYSQL_DEV_PWD = 'Simors2017'
var MYSQL_DEV_DB = 'hlife_dev'
var MYSQL_PRE_USER = 'xiaojee'
var MYSQL_PRE_PWD = 'Xiaojee2017'
var MYSQL_PRE_DB = 'hlife_pre'
var MYSQL_PROD_USER = ''
var MYSQL_PROD_PWD = ''
var MYSQL_PROD_DB = 'hlife_prod'


var PINGPP_APP_ID = "app_Pq5G0SOeXLC01mX9" //ping++ 邻家优店应用Id
var PINGPP_TEST_API_KEY = "sk_test_fbTiHOOG0008r9Sq10GWXXnT" //Secret Key
var PINGPP_LIVE_API_KEY = "sk_live_P044i19GCS8SyT84eTvbHmbH" //Secret Key


if (process.env.LEANCLOUD_APP_ID === 'K5Rltwmfnxd5pYjMsOFFL0kT-gzGzoHsz') {
  REDIS_DB = DEBUG_REDIS
  MYSQL_USER = MYSQL_DEV_USER
  MYSQL_PWD = MYSQL_DEV_PWD
  MYSQL_DB = MYSQL_DEV_DB
} else if (process.env.LEANCLOUD_APP_ID === 'TUVjJ5HHNmopfJeREa4IcB1T-gzGzoHsz') {
  REDIS_DB = PRE_REDIS
  MYSQL_USER = MYSQL_PRE_USER
  MYSQL_PWD = MYSQL_PRE_PWD
  MYSQL_DB = MYSQL_PRE_DB
} else {
  REDIS_DB = PROD_REDIS
  MYSQL_USER = MYSQL_PROD_USER
  MYSQL_PWD = MYSQL_PROD_PWD
  MYSQL_DB = MYSQL_PROD_DB
}

var GLOBAL_CONFIG = {
  REDIS_AUTH: REDIS_AUTH,
  REDIS_URL: REDIS_URL,
  REDIS_PORT: REDIS_PORT,
  REDIS_DB: REDIS_DB,

  MYSQL_HOST: MYSQL_HOST,
  MYSQL_USER: MYSQL_USER,
  MYSQL_PWD: MYSQL_PWD,
  MYSQL_DB: MYSQL_DB,

  PINGPP_APP_ID: PINGPP_APP_ID,
  PINGPP_API_KEY: PINGPP_TEST_API_KEY,
}

module.exports = GLOBAL_CONFIG