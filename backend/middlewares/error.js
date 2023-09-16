export const errorMiddleware = ({ err, req, res, next }) => {
  const { message, statusCode } = err;
  message = message || "Internal server error";
  statusCode = statusCode || 500;
  res.status(statusCode).json({ success: false, message: message });
};
