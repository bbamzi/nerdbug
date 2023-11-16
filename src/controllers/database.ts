import { AppError } from "../util/appError";
import db from "./../models";

export async function createUser(database: any, body: any) {
  const newUser = await database.User.create(body);

  return newUser;
}

export async function findAllUsers(database: any) {
  const allUsers = await database.User.findAll({
    attributes: ["id", "firstName", "lastName", "email", "role"],
  });

  return allUsers;
}

export async function findOneUser(database: any, id: string) {
  const user = await database.User.findOne({
    where: { id: id },
    attributes: ["id", "firstName", "lastName", "email", "role"],
  });

  return user;
}

export async function updateOneUser(database: any, id: string) {
  const user = await database.User.findOne({
    where: { id: id },
    attributes: ["firstName", "lastName", "email", "role", "id"],
  });

  return user;
}
export async function deleteOneUser(database: any, id: string) {
  const user = await database.User.findOne({
    where: { id: id },
  });

  if (!user) {
    new Error("cannot delete an  user that don't exist");
  }

  await user.destroy();
}
