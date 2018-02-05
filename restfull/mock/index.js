// 使用 Mock
var Mock = require('mockjs');
var Random = Mock.Random;
var data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [
    {
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
    }],
});

const mockData = {
  generateUser: () => {
    let user = {};

    return user;
  },
  generateApplyRecord: () => {
    let applyRecord = {
      from: Random.datetime('yyyy-MM-dd HH:mm'), // 从什么时候开始请假
      to: Random.datetime('yyyy-MM-dd HH:mm'), // 请到什么时候
      user_id: Random.title(3, 10), // 谁请假
      apply_user_id: Random.title(3, 10),//向谁请假
      description: Random.ctitle(3, 10),//为什么请假
      status: '1',
    };
    return applyRecord
  },
};

module.exports = mockData;