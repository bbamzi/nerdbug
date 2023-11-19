import supertest from "supertest";
import { app } from "../app";
import * as UserService from "../controllers/database";
import db from "../models";
import { findOneUser } from "../controllers/database";
import { send } from "process";
import { signToken } from "../controllers/auth";
import { mock } from "node:test";

const { v4: uuidv4 } = require("uuid");

const rightPayload = {
  status: "success",
  token: expect.any(String),
  data: {
    user: {
      email: "johndoe@nerbug.io",
      firstName: "akinbode",
      id: "5fd0ff36-60f1-4b16-99a2-6e341dc82f71",
      lastName: "bamigboye",
      role: "admin",
    },
  },
};

const userInput = {
  firstName: "akinbode",
  lastName: "bams",
  email: "oye93@aol.com",
  password: "12345678",
};

const userUpdateInput = {
  firstName: "akinbodes",
  lastName: "bamsi",
  email: "oyes93@aol.com",
  password: "123456789",
};

//########################## Routes
describe("Route", () => {
  describe("Checks for wrong get routes", () => {
    describe("given the route does not exist ", () => {
      it("should return 404", async () => {
        await supertest(app).get("/api/v1/wrongaddrres").expect(404);
      });
    });
  });
});

// ########################## Create a new user
let createdMockUser: any;
describe("user", () => {
  beforeAll(async () => {
    createdMockUser = await UserService.createUser(userInput);
  });

  afterAll(async () => {
    const res = await UserService.deleteOneUser(createdMockUser.id);
  });

  describe("create a new user ", () => {
    describe("given all fields required are filled", () => {
      it("Should return 201", async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createUser")
          //@ts-ignore
          .mockReturnValue(rightPayload);
        const { statusCode, body } = await supertest(app)
          .post("/api/v1/users/createUser")
          .send(userInput);
        expect(statusCode).toBe(201);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });
  });

  describe("get a user", () => {
    describe("given the user does not exists ", () => {
      it("should return 404", async () => {
        const { body, statusCode } = await supertest(app).get(
          `/api/v1/users/112932323211212ndksds`
        );
        expect(statusCode).toBe(404);

        expect(body).toEqual({
          status: "fail",
          message: "No User With That Id Found",
        });
      });
    });
    describe("given the user exists ", () => {
      it("should return 200", async () => {
        const { body, statusCode } = await supertest(app).get(
          `/api/v1/users/${createdMockUser.id}`
        );

        expect(statusCode).toBe(200);
      });
    });
  });

  // describe("get all users", () => {
  //   describe("given request is authorized to an admin", () => {
  //     it("should return a 200 status code ", async () => {
  //       await supertest(app)
  //         .get(`/api/v1/users`)
  //         .set(`Authorization`, `Bearer ${signToken(createdMockUser.id)}`);
  //     });
  //   });
  // });

  describe("update a user", () => {
    describe("given the user does not exists ", () => {
      it("should return 404", async () => {
        const { body, statusCode } = await supertest(app)
          .patch(`/api/v1/users/112932323211212ndksds`)
          .set(`Authorization`, `Bearer ${signToken(createdMockUser.id)}`);
        expect(statusCode).toBe(404);

        expect(body).toEqual({
          status: "fail",
          message: "No User With That Id Found",
        });
      });
    });
    describe("given request is authorized to an admin", () => {
      it("should return a 200 status code ", async () => {
        await supertest(app)
          .patch(`/api/v1/users`)
          .set(`Authorization`, `Bearer ${signToken(createdMockUser.id)}`)
          .send(userInput);
      });
    });
  });

  describe("delete a user", () => {
    describe("given the user does not exists ", () => {
      it("should return 404", async () => {
        const { body, statusCode } = await supertest(app)
          .patch(`/api/v1/users/112932323211212ndksds`)
          .set(`Authorization`, `Bearer ${signToken(createdMockUser.id)}`);
        expect(statusCode).toBe(404);

        expect(body).toEqual({
          status: "fail",
          message: "No User With That Id Found",
        });
      });
    });

    describe("given request is authorized to an admin", () => {
      it("should return a 200 status code ", async () => {
        await supertest(app)
          .delete(`/api/v1/users`)
          .set(`Authorization`, `Bearer ${signToken(createdMockUser.id)}`)
          .send(userInput);
      });
    });
  });
});

// ###############get one user
