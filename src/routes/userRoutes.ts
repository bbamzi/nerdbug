import { Router } from "express";
import {
  CreateUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userControllers";
import { login, protect, restrictToAdmin } from "../controllers/auth";

const router = Router();

router.post("/createUser", CreateUser);
router.get("/", protect, restrictToAdmin, getAllUsers);
// router.patch("/updateMe", protect, updateMe);
router.post("/login", login);
router.get("/:id", getUser);
router.patch("/:id", protect, updateUser);
router.delete("/:id", protect, restrictToAdmin, deleteUser);

export default router;
