const jwt = require('jsonwebtoken');
const cfile = require('../../config/common');
const config = cfile[process.env.NODE_ENV || 'development'];

const secret = config.jwtSecret;

async function parse(tokenStr) {
  if (tokenStr) {
    try {
      return jwt.verify(tokenStr, secret);
    } catch (err) {
      return null;
    }
  }
  return null;
}

/**
 * 判断token是否可用
 */
module.exports = function() {
  return async function(ctx, next) {
    try {
      const token = ctx.header.authorization;  // 获取jwt
      if (token) {
        let payload;
        try {
          payload = await parse(token.split(' ')[1], secret);  // 解密payload，获取用户名和ID
          console.log(payload);
          ctx.user = {
            openid: payload.data.openid,
            id: payload.data.user_id,
          };
        } catch (err) {
          console.log('token verify fail: ', err);
        }
      }

      console.log(`token: ${token}`);

      await next();
    } catch (err) {
      if (err.status === 401) {
        ctx.body = {
          code: -1,
          message: '认证失败',
        };
      } else {
        err.status = 404;
        ctx.body = '404';
        console.log('不服就是怼：', err);
      }
    }
  };
};