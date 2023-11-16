import express, { Request, Response, NextFunction } from "express";
import db from "./models";
import { json } from "body-parser";
import { users } from "./seeders/user";
import userRoutes from "./routes/userRoutes";
const globalErrorHandler = require("./controllers/error");
import { AppError } from "./util/appError";
var cookieParser = require("cookie-parser");
export const app = express();

app.use(json());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(
      `Can't find ${req.protocol}://${req.get("host")}${
        req.originalUrl
      } on this Server! , Please Check The Url`,

      404
    )
  );
});

app.use(globalErrorHandler);

// db.sequelize.sync().then(() => {
//   app.listen(port, () => {
//     console.log(`App listen `);
//   });
// });
