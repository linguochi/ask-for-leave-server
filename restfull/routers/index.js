/*
  路由
 */
import {RecordController, UserController} from '../controllers/index';

const router = require('koa-router')({
  prefix: '/api/',
},);

router.get('addUser', UserController.addUser);
router.post('wxUserLogin', UserController.wxUserLogin);
router.get('findAllUsers', UserController.findAllUsers);
router.get('getRecords', RecordController.getRecords);
router.post('updateUserInfo', UserController.updateUserInfo);
router.post('askforleave', RecordController.addRecord);
router.get('getUserLeader', UserController.getUserLeader);
router.get('getVerifyRecords', RecordController.getVerifyRecords);

module.exports = router;