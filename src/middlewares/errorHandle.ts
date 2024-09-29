import createHttpError from "http-errors";

export const ErrorMiddleware = (err, req, res, next) => {
  if (createHttpError.isHttpError(err)) {
    return res.status(err.status || 500).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  }

  return res.status(500).json({
    error: {
      message: "Internal Server Error",
      status: 500,
    },
  });
};
