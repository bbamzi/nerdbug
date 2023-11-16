import { RequestHandler } from "express";
import db from "../models";
import { AppError } from "../util/appError";
import { createSentToken } from "./auth";
import {
  createUser,
  deleteOneUser,
  findAllUsers,
  findOneUser,
  updateOneUser,
} from "./database";
export const CreateUser: RequestHandler = async (req, res, next) => {
  try {
    const newUser = await createUser(db, req.body);
    const { firstName, lastName, email, role, id, createdAt } = newUser;
    const scope = {
      id,
      firstName,
      lastName,
      email,
      role,
      createdAt,
    };
    createSentToken(scope, 201, res);
  } catch (error: any) {
    return next(error);
  }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const allUsers = await findAllUsers(db);

    const count = allUsers.length;
    res.status(200).json({
      status: "Success",
      message: count > 0 ? `${count} User(s) Found` : "No user found add more ",
      meta: {
        count: allUsers.length,
      },
      data: allUsers,
    });
  } catch (error) {
    return next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await findOneUser(db, req.params.id);

    if (!user) {
      return next(new AppError("No User With That Id Found", 404));
    }

    res.status(200).json({
      status: "Success",
      message: "User Found",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await updateOneUser(db, req.params.id);

    if (!user) {
      return next(new AppError("No User With That Id Found", 404));
    }

    await user.update(req.body);

    res.status(200).json({
      status: "Success",
      message: "User Updated",
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const deletedResult = deleteOneUser(db, req.params.id);

    // if (!deletedResult) {
    //   return next(new AppError("No User With That Id Found", 404));
    // }

    res.status(204).json({
      status: "Success",
      message: "User Deleted",
    });
  } catch (error) {
    return next(error);
  }
};
