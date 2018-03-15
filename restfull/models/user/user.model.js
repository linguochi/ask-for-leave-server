const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {type: String, required: true}, // 用户名
  phoneNumber: {type: String, default: ''}, // 手机号
  password: String, //密码
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: '5a781f7ad0e48801c759f88e',
  },
  openId: String,
});

module.exports = mongoose.model('User', UserSchema);