/*
  路由
 */
import {UserController} from '../controllers/index';

const router = require('koa-router')();

router.get('/api/query', UserController.query);

module.exports = router;
