import {RecordModel} from '../models/index';
import CommonConfig from '../../config/common';
import mockData from '../mock/index';

const config = CommonConfig[process.env.NODE_ENV || 'development'];

class RecordController {
  static async getRecords(ctx) {
    let recordsResult = await RecordModel.find();
    ctx.success({
      msg: '获取数据成功',
      data: recordsResult,
    });
  }

  //添加
  static async addRecord(ctx) {
    console.log(ctx.user);
    var record = mockData.generateApplyRecord();
    ctx.success({
      msg: '新增用户功',
      data: record,

    });
  }

};

export default RecordController;