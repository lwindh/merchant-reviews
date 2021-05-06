'use strict';

module.exports = (options, app) => {
  return async function(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 抛出错误事件
      app.emit('error', err, this);
      const status = err.status || 500;
      const error =
        status === 500 && app.config.env === 'prod'
          ? 'Internal Server Error'
          : err.message;

      ctx.body = {
        code: status,
        error,
      };

      if (status === 422) {
        ctx.body.detail = err.errors;
      }

      ctx.status = 200;
    }
  };
};
