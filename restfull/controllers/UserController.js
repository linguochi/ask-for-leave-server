import {UserModel} from '../models/index';
import CommonConfig from '../../config/common';
import JWT from '../../utils/token';
import request from 'superagent';

var WXBizDataCrypt = require('../../utils/WXBizDataCrypt');

const config = CommonConfig[process.env.NODE_ENV || 'development'];

class UserController {
  //新增用户
  static async addUser(ctx) {
    var user = new UserModel({
      name: '林国池',
      nickname: '测试用户',
      avatar: 'http://ip.example.com/u/xxx.png',
      phoneNumber: '13800138000',
      openId: 'hhh',
      sex: 0,
    });
    user = await user.save();
    ctx.success({
      msg: '新增用户功',
      data: user,
    });
  }

  //更新用户信息
  static async updateUserInfo(ctx) {

    const userInfo = ctx.body;
  }

  static async wxUserLogin(ctx) {
    const postData = ctx.request.body;
    let { code, userinfo } = postData;
    let { iv, encryptedData } = userinfo;
    //得到 session_key 和 openId
    let sessionData = await UserController.getSessionKey(code);
    console.log(sessionData);
    if (!sessionData.openid) {
      return ctx.error({ msg: '登陆失败' });
    }
    //解密出敏感信息
    let pc = new WXBizDataCrypt(config.weChat.appId, sessionData.session_key);
    let userData = pc.decryptData(encryptedData, iv);

    //根据openid查询用户是否已经注册
    let userInfo = await UserModel.findOne({ openId: sessionData.openid });
    console.log('userInfo:' + userInfo);
    //没有注册过则新增这个用户
    if (lodash.isEmpty(userInfo)) {
      userInfo = new UserModel({
        name: userData.nickName,
        nickname: userData.nickName,
        avatar: userData.avatarUrl,
        phoneNumber: '13800138000',
        openId: sessionData.openid,
        sex: userData.gender,
      });
      userInfo = await userInfo.save();
    }

    sessionData.user_id = userInfo.id;

    const token = await (new JWT()).create(sessionData);

    console.log(token);

    ctx.success({
      msg: '登陆成功',
      data: { token: token },
    });
  }

  //用户列表
  static async findAllUsers(ctx) {
    const query = UserModel.find({});
    let res = [];
    await query.exec(function(err, users) {
      if (err) {
        res = [];
      } else {
        res = users;
      }
    });
    return res;
  }

  /**
   * code 换取 session_key
   */
  static getSessionKey(code) {
    const appId = config.weChat.appId;
    const secret = config.weChat.secret;
    return new Promise((resolve, reject) => {
      request.get('https://api.weixin.qq.com/sns/jscode2session').query({
        appid: appId,
        secret: secret,
        js_code: code,
        'grant_type': 'authorization_code',
      }).end((err, res) => {
        if (err) {
          reject(err);
        }
        res = JSON.parse(res.text);
        resolve(res);
      });
    });
  }
};

export default UserController;