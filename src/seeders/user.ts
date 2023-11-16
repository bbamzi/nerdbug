import { v4 as uuidv4 } from "uuid";
// import { UUIDV4 } from "sequelize";
export const users = [
  {
    id: uuidv4(),
    firstName: "Akinbode",
    lastName: "Bamigboye",
    email: "abamigboye@nerdbug.io",
    password: "abc123",
  },
  {
    id: uuidv4(),
    firstName: "Adebayo",
    lastName: "Owojori",
    email: "adebayo@nerdbug.io",
    password: "abc123",
    role: "admin",
  },
];
