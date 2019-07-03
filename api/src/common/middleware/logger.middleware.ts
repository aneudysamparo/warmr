import { Logger } from '@nestjs/common';

const logger = new Logger('HTTP');

export function httpLogger(req, res, next) {
  logger.log(req.method + ' -> ' + req.path);
  next();
};
