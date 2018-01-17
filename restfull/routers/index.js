/*
  路由
 */
import {UserController} from '../controllers/index';

const router = require('koa-router')(
    {
      prefix: '/api/',
    },
);

router.get('addUser', UserController.addUser);
router.get('wxUserLogin', UserController.wxUserLogin);
router.get('findAllUsers', UserController.findAllUsers);

module.exports = router;
