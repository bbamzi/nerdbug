import jwt from "jsonwebtoken";

import { RequestHandler, Request, Response, NextFunction } from "express";
import { AppError } from "../util/appError";
import { promisify } from "util";
import { env } from "node:process";
import db from "../models";
import { decode } from "punycode";
import bcrypt from "bcrypt";

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.SECRET_KEY as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const createSentToken = (
  user: any,
  statusCode: number,
  res: Response
) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOptions);
  res.cookie("user", user.id);
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const protect: RequestHandler = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError("You Are Not Authorized To Access This Resources", 401)
    );
  }
  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY as string);
  } catch (error) {
    return next(new AppError("Invalid token, Login or sign up", 401));
  }

  const validUser = await db.User.findOne({
    where: { id: decoded.id },
  });

  if (!validUser) {
    return next(new AppError("Invalid Authorization", 401));
  }
  res.cookie("user", validUser.id);

  return next();
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please Provide Email And Password", 400));
  }

  const user = await db.User.findOne({
    where: { email: req.body.email },
    attributes: ["email", "id", "password"],
  });

  // console.log(password, user.password);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect Email or Password", 401));
  }

  res.cookie("user", user.id);

  createSentToken(user, 200, res);
};

export const restrictToAdmin: RequestHandler = async (req, res, next) => {
  const userId: string = req.cookies.user;

  try {
    const user = await db.User.findOne({
      where: { id: userId },
    });
    if (user.role !== "admin") {
      return next(
        new AppError("You are Not Authorized For This Operation", 403)
      );
    }
  } catch (error) {
    return next(error);
  }

  next();
};
