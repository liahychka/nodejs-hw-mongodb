export const errorHandler = (err, req, res, next) => {
  res.status(404).json({
    message: 'Something went wrong',
  });
};