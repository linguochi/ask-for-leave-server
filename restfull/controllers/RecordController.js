import {RecordModel} from '../models/index';
import CommonConfig from '../../config/common';
import mockData from '../mock/index';

const config = CommonConfig[process.env.NODE_ENV || 'development'];

class RecordController {
  static async records(ctx) {
    let recordsResult = await RecordModel.find();
    ctx.success({
      msg: '获取数据成功',
      data: recordsResult,
    });
  }

  //新增用户
  static async addRecord(ctx) {
    var record = mockData.generateApplyRecord();
    debugger;

    ctx.success({
      msg: '新增用户功',
      data: user,
    });
  }

};

export default RecordController;