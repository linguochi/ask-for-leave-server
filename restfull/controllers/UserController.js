import {UserModel} from '../models/index';

class UserController {
  //新增用户
  static async addUser(ctx) {
    var user = new UserModel({
      name: '林国池',
      nickname: '测试用户',
      avatar: 'http://ip.example.com/u/xxx.png',
      phoneNumber: '13800138000',
    });
    user = await user.save();
    ctx.success({ msg: '新增用户成功', data: user });

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
};

export default UserController;
