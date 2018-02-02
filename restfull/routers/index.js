/*
  路由
 */
import {UserController} from '../controllers/index';
import {RecordController} from '../controllers/index';

const router = require('koa-router')({
  prefix: '/api/',
},);

router.get('addUser', UserController.addUser);
router.post('wxUserLogin', UserController.wxUserLogin);
router.get('findAllUsers', UserController.findAllUsers);
router.get('getRecords', RecordController.records());
router.post('updateUserInfo', UserController.updateUserInfo);

module.exports = router;