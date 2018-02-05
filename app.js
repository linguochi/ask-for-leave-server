const Koa = require('koa');
const app = new Koa();
const debug = require('debug')('demo:server');
const cfile = require('./config/common');
const jwt = require('koa-jwt');
const tokenErrorHandler = require('./restfull/middlewares/tokenErrorHandler');
const config = cfile[process.env.NODE_ENV || 'development'];
const koaBody = require('koa-body');
global.lodash = require('lodash');
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(config.port);

require('babel-register');
const db = require('./restfull/models/db');
const routers = require('./restfull/routers');

app.use(koaBody());
app.use(tokenErrorHandler());
app.use(jwt({
      secret: config.jwtSecret,
    }).unless({ path: [/^\/api\/wxUserLogin/] }),
);
app.use(require('./restfull/middlewares/response'));

app.use(routers.routes());

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

app.listen(port);
app.on('error', onError);
app.on('listening', onListening);
module.exports = app;