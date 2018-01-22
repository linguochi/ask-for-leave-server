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
      appId: 'wx57d86edd2c6f438d',
      secret: 'cdd081c1fb23cf4a73dcfe90a034fbe7',
    },
  },
  //
};