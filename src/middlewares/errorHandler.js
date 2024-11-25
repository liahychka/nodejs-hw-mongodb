import createHttpError from 'http-errors';

export function errorHandler(error, req, res, next) {
    throw new createHttpError(500, 'Something went wrong');
}