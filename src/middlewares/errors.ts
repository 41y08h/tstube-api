import { RequestHandler } from "express";

const errors: RequestHandler = (req, res, next) => {
  res.error = (message, code = 400) => {
    res.status(code).json({ status: "error", code, message });
  };
  next();
};

export default errors;
