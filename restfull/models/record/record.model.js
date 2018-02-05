const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  from: {}, // 从什么时候开始请假
  to: {}, // 请到什么时候
  user_id: {}, // 谁请假
  apply_user_ids: {},//向谁请假
  description: {},//为什么请假
  status: {}, //状态码 {0：审批中 1：同意请假 2：请假不通过 3：取消请假}
});

module.exports = mongoose.model('Record', RecordSchema);