/*
  公用配置
 */

module.exports = {
  //开发环境配置
  development: {
    //数据库配置
    mongo: {
      uri: 'mongodb://localhost:27017/askForLeave',
    },
    port: '3000',
    weChat: {
      appId: 'wx4c16646d1bca75a7',
      secret: '9429c86d7408e336ba0ec14a89a5a5f2',
    },
  },
  //
};