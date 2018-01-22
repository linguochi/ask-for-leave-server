const jsonWebToken = require('jsonwebtoken');
import {UserModel} from '../restfull/models/index';

const secret = 'linguochi';

module.exports = class Token {
  //注册一个token 永不过期
  async create(userInfo) {
    const token = jsonWebToken.sign({
          data: userInfo,
        }, secret,
    );
    return token;
  }

  // 从token里面解析回user_id
  async getUserId(token) {
    if (!token) {
      return 0;
    }
    const result = await this.parse(token);
    if (!result || result.user_id < 0) {
      return 0;
    }
    return result.user_id;
  }

  // 根据token返回用户所有信息
  async getUserInfo(token) {
    const userId = await this.getUserId(token);
    if (userId <= 0) {
      return null;
    }
    const userInfo = await UserModel.find({ _id: userId });
    return userInfo;
  }

  async parse(token) {
    if (token) {
      try {
        return jsonWebToken.verify(token, secret);
      } catch (err) {
        return null;
      }
    }
    return null;
  }

  async verify() {
    const result = await this.parse();

  }
};