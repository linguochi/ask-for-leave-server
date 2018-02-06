import {RecordModel} from '../models/index';
import CommonConfig from '../../config/common';

const config = CommonConfig[process.env.NODE_ENV || 'development'];

class RecordController {
  static async getRecords(ctx) {
    let recordsResult = await RecordModel.find().populate('_user');
    ctx.success({
      msg: '获取数据成功',
      data: recordsResult,
    });
  }

  static async getVerifyRecords(ctx) {
    //得到当前用户审批的请假单
    let result = await RecordModel.find({
      reviewer: ctx.user.id,
    }).populate('_user');
    ctx.success({
      msg: '获取数据成功',
      data: result,
    });
  }

  //审批请假单
  static async verifyRecord(ctx) {
    let params = ctx.request.body;

  }

  //添加
  static async addRecord(ctx) {
    let newRecord = ctx.request.body;
    if (newRecord) {
      newRecord.user_id = ctx.user.id;
      let result = await RecordModel.create({
        from: newRecord.startTime, // 从什么时候开始请假
        to: newRecord.endTime, // 请到什么时候
        leaveType: newRecord.leaveType,
        _user: newRecord.user_id, // 谁请假
        reviewer: newRecord.reviewer,
        description: newRecord.description,//为什么请假
        status: 0, //状态码 {0：审批中 1：同意请假 2：请假不通过 3：取消请假}
      });
      ctx.success({
        msg: '新增请假记录成功',
        data: result,
      });
    } else {
      ctx.error({
        msg: '未知错误',
      });
    }

  }
};

export default RecordController;