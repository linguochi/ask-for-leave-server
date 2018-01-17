const Koa = require('koa');
const app = new Koa();
const db = require('./restfull/models/db');
const routers = require('./restfull/routers');

app.use(require('./restfull/middlewares/response'));

app.use(routers.routes())

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

module.exports = app;