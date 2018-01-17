const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true }, // 用户名
  nickname: { type: String, required: true }, // 昵称
  phoneNumber: { type: String, default: '' },
  avatar: { type: String, default: '' },    // 头像
});

module.exports = mongoose.model('User', UserSchema);