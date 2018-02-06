const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true }, // 用户名
  nickname: { type: String, required: true }, // 昵称
  phoneNumber: { type: String, default: '' }, // 手机号
  avatar: { type: String, default: '' },    // 头像
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: '5a781f7ad0e48801c759f88e',
  },
  openId: { type: String, default: '', required: true },
  sex: { type: Number, default: 0 }, //性别
});

module.exports = mongoose.model('User', UserSchema);