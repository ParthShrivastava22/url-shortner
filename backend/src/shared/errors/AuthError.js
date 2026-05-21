import AppError from "./AppError.js";

class AuthError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export default AuthError;
