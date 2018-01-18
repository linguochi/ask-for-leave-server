import {UserModel} from '../models/index';
import CommonConfig from '../../config/common';
import request from 'superagent';

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
    ctx.success({ msg: '新增用户成功', data: user });
  }

  static async wxUserLogin(ctx) {
    console.log(ctx);
    const code = ctx.query.code;
    UserController.getSessionKey(code).then(
        res => {
          console.log(res);
        },
        err => {},
    ).catch(
        err => next(err),
    );
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
