const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  from: {}, // 从什么时候开始请假
  to: {}, // 请到什么时候
  leaveType: {},// 请假类型{0：年假，1：事假，2：病假}
  _user: { type: Schema.Types.ObjectId, ref: 'User' }, // 谁请假
  description: {},//为什么请假
  reviewer: {},//下一步需要谁审核， 默认是直接leader
  status: {}, //状态码 {0：审批中 1：同意请假 2：请假不通过 3：取消请假}
});

module.exports = mongoose.model('Record', RecordSchema);