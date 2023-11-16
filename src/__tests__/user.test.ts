// import { describe, it } from "node:test";
import { app } from "../app";
import supertest = require("supertest");
describe("user", () => {
  // create a new user
  describe("Create a new user ", () => {
    // describe("Given the fields are correct", () => {
    //   it("should return a 201 ", async () => {
    //     await supertest(app)
    //       .post(`/api/v1/users/createUser`)
    //       .send({
    //         firstName: "akinbodees",
    //         lastName: "bamigboyees",
    //         role: "admin",
    //         email: "akbamses@nerdbug.io",
    //         password: "123456789",
    //       })
    //       .expect(201);
    //   });
    // });
    // 400
    describe("Given the required fields are not entered ", () => {
      it("should return a 400 ", async () => {
        await supertest(app)
          .post(`/api/v1/users/createUser`)
          .send({
            firstName: "",
            lastName: "",
            role: "",
            email: "",
            password: "",
          })
          .expect(400);
      });
    });
    //400
    describe("Given the entered fields are duplicate unique fields ", () => {
      it("should return a 400 ", async () => {
        await supertest(app)
          .post(`/api/v1/users/createUser`)
          .send({
            firstName: "newUser4",
            lastName: "newuser4",
            role: "admin",
            email: "newuser4@gamail.com",
            password: "123456789",
          })
          .expect(400);
      });
    });
  });

  // get users
  describe("Getting all  users ", () => {
    describe("Given the request was ok", () => {
      it("should return a 200 ", async () => {
        await supertest(app)
          .get(`/api/v1/users/`)

          .expect(200);
      });
    });
  });
});

// describe("get user", () => {
//   describe("given the user does not exist", () => {
//     it("should return a 404", async () => {
//       const userId = "ac47a608-191a-4a38-bbc7-e2521d310ff";
//       await supertest(app)
//         .get(
//           `/api/v1/users/${userId}
//       `
//         )
//         .expect(404);
//     });
//   });
// });
