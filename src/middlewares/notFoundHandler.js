import createHttpError from 'http-errors';

export function notFoundHandler(req, res, next) {
  throw new createHttpError(404, 'Not found');
}