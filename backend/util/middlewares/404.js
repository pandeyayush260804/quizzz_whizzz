export const Error404 = (req, res, next) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: "You typed something wrong",
  });
};