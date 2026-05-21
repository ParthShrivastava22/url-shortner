import AppError from "../errors/AppError.js";

const errorMiddleware = (err, req, res, next) => {
  // Known operational errors
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.constructor.name,
      message: err.message,
    });
  }

  // Unexpected errors
  console.error(err);

  return res.status(500).json({
    success: false,
    error: "InternalServerError",
    message: "Internal Server Error",
  });
};

export default errorMiddleware;
