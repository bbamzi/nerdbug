import { Request, Response, NextFunction } from "express";
import { AppError } from "../util/appError";

const handleConstraintFieldDB = (err: any) => {
  const message = ` ${err.parent.sqlMessage} , Please Use a Different Value`;
  return new AppError(message, 400);
};

const handleValidationErrorDb = (err: any) => {
  const message = ` ${err.errors[0].message}, Please Fill the field`;
  return new AppError(message, 400);
};

module.exports = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "SequelizeUniqueConstraintError")
    err = handleConstraintFieldDB(err);

  if (err.name === "SequelizeValidationError")
    err = handleValidationErrorDb(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
